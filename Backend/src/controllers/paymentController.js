import PaymentService from '../services/paymentService.js';
import QRService from '../services/qrService.js';
import { sendBookingConfirmation } from '../services/emailService.js';
import { Booking, Payment, Ticket, Seat, BookingItem, User } from '../models/index.js';
import { sequelize } from '../models/index.js';

/**
 * Initiate payment for a booking
 */
/*
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            bookingId: { type: "integer", example: 1 }
          },
          required: ["bookingId"]
        }
      }
    }
  }
*/
export const initiatePayment = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const userId = req.user.userId;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: 'bookingId is required'
      });
    }

    const booking = await Booking.findOne({
      where: { booking_id: bookingId, user_id: userId }
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.booking_status === 'paid') {
      return res.status(400).json({
        success: false,
        message: 'Booking already paid'
      });
    }

    if (booking.expires_at && new Date() > new Date(booking.expires_at)) {
      return res.status(400).json({
        success: false,
        message: 'Booking has expired'
      });
    }

    const paymentData = await PaymentService.initiatePayment({
      amount: booking.total_amount,
      bookingId: booking.booking_id,
      userId: userId,
      description: `Library Seat Booking #${booking.booking_id}`,
      redirectUrl: `${process.env.FRONTEND_URL}/payment/success`,
      cancelUrl: `${process.env.FRONTEND_URL}/payment/cancel`
    });

    if (!paymentData.success) {
      return res.status(400).json({
        success: false,
        message: paymentData.message || 'Payment initiation failed'
      });
    }

    await Payment.create({
      booking_id: booking.booking_id,
      amount: booking.total_amount,
      payment_method: 'PayChangu',
      payment_status: 'pending',
      transaction_id: paymentData.txRef
    });

    res.json({
      success: true,
      checkoutUrl: paymentData.checkoutUrl,
      txRef: paymentData.txRef,
      amount: booking.total_amount,
      currency: 'MWK'
    });
  } catch (error) {
    console.error('Initiate payment error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Payment initiation failed'
    });
  }
};

/**
 * Verify payment status
 */
export const verifyPayment = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { txRef } = req.params;
    const userId = req.user.userId;

    const payment = await Payment.findOne({
      where: { transaction_id: txRef },
      include: [{ model: Booking }]
    });

    if (!payment) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    if (payment.payment_status === 'success') {
      await transaction.rollback();
      return res.json({
        success: true,
        status: 'success',
        message: 'Payment already verified'
      });
    }

    const verification = await PaymentService.verifyPayment(txRef);

    if (!verification.success) {
      await payment.update({ payment_status: 'failed' }, { transaction });
      await transaction.commit();
      return res.status(400).json({
        success: false,
        status: 'failed',
        message: verification.message || 'Payment verification failed'
      });
    }

    await payment.update(
      {
        payment_status: 'success',
        paid_at: new Date()
      },
      { transaction }
    );

    const booking = payment.Booking;
    await booking.update({ booking_status: 'paid' }, { transaction });

    const ticketCode = QRService.generateTicketCode(booking.booking_id);
    const qrCodeData = await QRService.generateQRCode(ticketCode);

    const ticket = await Ticket.create(
      {
        booking_id: booking.booking_id,
        ticket_code: ticketCode,
        valid_date: booking.booking_date,
        is_valid: true,
        qr_code_data: qrCodeData
      },
      { transaction }
    );

    await transaction.commit();

    try {
      const user = await User.findByPk(userId);
      const bookingItems = await BookingItem.findAll({
        where: { booking_id: booking.booking_id },
        include: [Seat]
      });
      const seats = bookingItems.map((item) => item.Seat);

      await sendBookingConfirmation(user, booking, ticket, seats);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.json({
      success: true,
      status: 'success',
      message: 'Payment verified successfully',
      ticket: {
        code: ticket.ticket_code,
        validDate: ticket.valid_date,
        qrCode: ticket.qr_code_data
      }
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Verify payment error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Payment verification failed'
    });
  }
};

/**
 * PayChangu webhook handler
 */
export const webhookHandler = async (req, res) => {
  try {
    let txRef = null;

    if (req.method === 'GET') {
      txRef = req.query.tx_ref;
      console.log('Webhook GET received:', txRef);
    } else if (req.method === 'POST') {
      txRef = req.body.tx_ref || req.body.transaction_reference;
      console.log('Webhook POST received:', txRef);
    }

    if (!txRef) {
      console.log('Webhook received without tx_ref');
      return res.status(200).json({ status: 'ignored' });
    }

    const payment = await Payment.findOne({
      where: { transaction_id: txRef },
      include: [{ model: Booking }]
    });

    if (!payment) {
      console.log('Payment not found for tx_ref:', txRef);
      return res.status(200).json({ status: 'not_found' });
    }

    if (payment.payment_status === 'success') {
      return res.status(200).json({ status: 'already_processed' });
    }

    const verification = await PaymentService.verifyPayment(txRef);

    if (verification.success) {
      await payment.update({
        payment_status: 'success',
        paid_at: new Date()
      });

      const booking = payment.Booking;
      await booking.update({ booking_status: 'paid' });

      const ticketCode = QRService.generateTicketCode(booking.booking_id);
      const qrCodeData = await QRService.generateQRCode(ticketCode);

      const ticket = await Ticket.create({
        booking_id: booking.booking_id,
        ticket_code: ticketCode,
        valid_date: booking.booking_date,
        is_valid: true,
        qr_code_data: qrCodeData
      });

      // ✅ SEND EMAIL
      try {
        const user = await User.findByPk(booking.user_id);
        const bookingItems = await BookingItem.findAll({
          where: { booking_id: booking.booking_id },
          include: [Seat]
        });
        const seats = bookingItems.map((item) => item.Seat);

        console.log('📧 Attempting to send email to:', user?.email);
        const emailResult = await sendBookingConfirmation(user, booking, ticket, seats);
        if (emailResult.success) {
          console.log('✅ Email sent successfully');
        } else {
          console.error('❌ Email failed:', emailResult.error);
        }
      } catch (emailError) {
        console.error('❌ Email sending failed:', emailError.message);
      }

      console.log('✅ Webhook processed successfully:', txRef);

      // ✅ NEW: Redirect browser (GET) to frontend success page
      if (req.method === 'GET') {
        return res.redirect(`${process.env.FRONTEND_URL}/payment/success`);
      }

      return res.status(200).json({ status: 'success' });
    }

    console.log('❌ Webhook verification failed:', txRef);

    // ✅ NEW: Redirect browser (GET) to frontend cancel page on failure
    if (req.method === 'GET') {
      return res.redirect(`${process.env.FRONTEND_URL}/payment/cancel`);
    }

    return res.status(200).json({ status: 'failed' });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(200).json({ status: 'error', message: error.message });
  }
};

/**
 * Get payment history for user
 */
export const getPaymentHistory = async (req, res) => {
  try {
    const userId = req.user.userId;

    const payments = await Payment.findAll({
      include: [
        {
          model: Booking,
          where: { user_id: userId },
          attributes: ['booking_id', 'booking_date', 'booking_status']
        }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      payments
    });
  } catch (error) {
    console.error('Payment history error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch payment history'
    });
  }
};