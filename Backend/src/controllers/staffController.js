import { sequelize } from '../models/index.js';
import { Booking, BookingItem, Seat, Ticket, User, LibrarySection } from '../models/index.js';
import QRService from '../services/qrService.js';
import { sendBookingConfirmation } from '../services/emailService.js';

export const processPOSBooking = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { booking_date, seats, occupant_name, occupant_email, add_electricity } = req.body;

    if (!booking_date || !seats || seats.length === 0) {
      await transaction.rollback();
      return res.status(400).json({ success: false, message: 'Date and seats required' });
    }

    let user = await User.findOne({ where: { email: occupant_email }, transaction });
    if (!user) {
      const tempPassword = Math.random().toString(36).slice(-8);
      user = await User.create({
        first_name: occupant_name.split(' ')[0] || 'POS',
        last_name: occupant_name.split(' ').slice(1).join(' ') || 'Customer',
        email: occupant_email,
        role: 'user',
        password_hash: tempPassword
      }, { transaction });
    }

    const seatRecords = await Seat.findAll({
      where: { seat_id: seats },
      include: [{ model: LibrarySection }],
      transaction
    });

    let totalAmount = 0;
    for (const seat of seatRecords) {
      totalAmount += Number(seat.LibrarySection?.price_per_seat || 0);
    }
    if (add_electricity) totalAmount += 400;

    const booking = await Booking.create({
      user_id: user.user_id,
      booking_date,
      booking_status: 'paid',
      total_seats: seats.length,
      total_amount: totalAmount,
      payment_method: 'cash',
      add_electricity: add_electricity || false
    }, { transaction });

    for (const seatId of seats) {
      await BookingItem.create({
        booking_id: booking.booking_id,
        seat_id: seatId,
        occupant_name: occupant_name
      }, { transaction });

      await Seat.update({ seat_status: 'booked' }, { where: { seat_id: seatId }, transaction });
    }

    const ticketCode = QRService.generateTicketCode(booking.booking_id);
    const qrData = await QRService.generateQRCode(ticketCode);

    const ticket = await Ticket.create({
      booking_id: booking.booking_id,
      ticket_code: ticketCode,
      valid_date: booking_date,
      qr_code_data: qrData
    }, { transaction });

    await transaction.commit();

    if (occupant_email) {
      sendBookingConfirmation(user, booking, ticket, seatRecords)
        .catch(err => console.error('POS Email error:', err));
    }

    res.json({ success: true, message: 'POS Cash Ticket Generated Successfully', ticket_code: ticketCode });
  } catch (error) {
    await transaction.rollback();
    console.error('POS Booking error:', error);
    res.status(500).json({ success: false, message: 'POS failed', error: error.message });
  }
};

export const checkInTicket = async (req, res) => {
  try {
    const { ticket_code } = req.body;

    const ticket = await Ticket.findOne({ 
      where: { ticket_code },
      include: [{ model: Booking }] 
    });

    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    if (ticket.Booking.booking_status === 'cancelled' || ticket.Booking.booking_status === 'refunded') {
      return res.status(400).json({ success: false, message: 'INVALID TICKET: This booking was cancelled or refunded.' });
    }

    if (ticket.checked_in) {
      return res.status(400).json({ success: false, message: 'Ticket already checked in' });
    }

    await ticket.update({ checked_in: true, checked_in_at: new Date() });

    res.json({ success: true, message: 'Checked in successfully', ticket });
  } catch (error) {
    console.error('Check-in error:', error);
    res.status(500).json({ success: false, message: 'Check-in failed' });
  }
};