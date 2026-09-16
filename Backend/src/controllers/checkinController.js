import { Ticket, Booking, BookingItem, Seat, User } from '../models/index.js';

/**
 * Verify QR code and check in user (Admin)
 */
export const checkIn = async (req, res) => {
  try {
    const { ticket_code } = req.body;

    if (!ticket_code) {
      return res.status(400).json({
        success: false,
        message: 'ticket_code is required'
      });
    }

    const ticket = await Ticket.findOne({
      where: { ticket_code },
      include: [
        {
          model: Booking,
          include: [
            { model: User, attributes: ['user_id', 'first_name', 'last_name', 'email'] },
            { model: BookingItem, include: [Seat] }
          ]
        }
      ]
    });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Invalid ticket code'
      });
    }

    if (!ticket.is_valid) {
      return res.status(400).json({
        success: false,
        message: 'Ticket is no longer valid'
      });
    }

    const booking = ticket.Booking;

    if (booking.booking_status !== 'paid') {
      return res.status(400).json({
        success: false,
        message: 'Booking is not paid'
      });
    }

    // Check if already checked in
    const alreadyCheckedIn = booking.BookingItems.some(item => item.is_checked_in);
    if (alreadyCheckedIn) {
      return res.status(400).json({
        success: false,
        message: 'User already checked in'
      });
    }

    // Mark all booking items as checked in
    for (const item of booking.BookingItems) {
      await item.update({ is_checked_in: true });
    }

    res.json({
      success: true,
      message: 'User checked in successfully',
      booking: {
        booking_id: booking.booking_id,
        user: booking.User,
        seats: booking.BookingItems.map(item => item.Seat.seat_label),
        date: booking.booking_date
      }
    });
  } catch (error) {
    console.error('Check-in error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Check-in failed'
    });
  }
};

/**
 * Check out user (Admin)
 */
export const checkOut = async (req, res) => {
  try {
    const { booking_id } = req.body;

    if (!booking_id) {
      return res.status(400).json({
        success: false,
        message: 'booking_id is required'
      });
    }

    const booking = await Booking.findByPk(booking_id, {
      include: [{ model: BookingItem }]
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Mark all booking items as checked out (release seats)
    for (const item of booking.BookingItems) {
      await item.update({ is_checked_in: false });
      await Seat.update(
        { seat_status: 'available' },
        { where: { seat_id: item.seat_id } }
      );
    }

    res.json({
      success: true,
      message: 'User checked out successfully'
    });
  } catch (error) {
    console.error('Check-out error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Check-out failed'
    });
  }
};