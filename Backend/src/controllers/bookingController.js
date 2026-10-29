import { Booking, BookingItem, Seat, LibrarySection, User, Ticket } from '../models/index.js';
import { sequelize } from '../models/index.js';

export const createBooking = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { booking_date, seats, add_electricity } = req.body;
    const userId = req.user.userId;

    if (!booking_date || !seats || seats.length === 0) {
      await transaction.rollback();
      return res.status(400).json({ success: false, message: 'booking_date and seats are required' });
    }

    if (seats.length > 5) {
      await transaction.rollback();
      return res.status(400).json({ success: false, message: 'Maximum 5 seats per booking' });
    }

    // ✅ Fetch seats with their sections to get real price
    const seatRecords = await Seat.findAll({
      where: { seat_id: seats },
      include: [{ model: LibrarySection }],
      transaction
    });

    let totalAmount = 0;
    for (const seat of seatRecords) {
      if (seat.seat_status !== 'available') {
        await transaction.rollback();
        return res.status(400).json({ success: false, message: `Seat ${seat.seat_label} is not available` });
      }
      totalAmount += Number(seat.LibrarySection?.price_per_seat || 0);
    }

    // ✅ Add Electricity Fee
    if (add_electricity) {
      totalAmount += 400;
    }

    const user = await User.findByPk(userId, { transaction });
    const autoOccupantName = user ? `${user.first_name} ${user.last_name}` : 'Online User';

    const booking = await Booking.create({
      user_id: userId,
      booking_date,
      booking_status: 'pending',
      total_seats: seats.length,
      total_amount: totalAmount,
      add_electricity: add_electricity || false,
      expires_at: new Date(Date.now() + 15 * 60 * 1000)
    }, { transaction });

    for (let i = 0; i < seats.length; i++) {
      await BookingItem.create({
        booking_id: booking.booking_id,
        seat_id: seats[i],
        occupant_name: autoOccupantName
      }, { transaction });

      await Seat.update(
        { seat_status: 'booked' },
        { where: { seat_id: seats[i] }, transaction }
      );
    }

    await transaction.commit();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking: {
        id: booking.booking_id,
        date: booking.booking_date,
        seats: seats.length,
        totalAmount: booking.total_amount,
        expiresAt: booking.expires_at
      }
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Create booking error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to create booking' });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const userId = req.user.userId;
    const bookings = await Booking.findAll({
      where: { user_id: userId },
      include: [
        {
          model: BookingItem,
          include: [
            { model: Seat, include: [{ model: LibrarySection, attributes: ['section_id', 'section_name'] }] }
          ]
        }
      ],
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, bookings });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch bookings' });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const booking = await Booking.findOne({
      where: { booking_id: id, user_id: userId },
      include: [
        {
          model: BookingItem,
          include: [
            { model: Seat, include: [{ model: LibrarySection, attributes: ['section_id', 'section_name'] }] }
          ]
        }
      ]
    });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, booking });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch booking' });
  }
};

export const cancelBooking = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const booking = await Booking.findOne({
      where: { booking_id: id, user_id: userId },
      include: [BookingItem]
    });

    if (!booking) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    if (booking.booking_status === 'cancelled') {
      await transaction.rollback();
      return res.status(400).json({ success: false, message: 'Booking already cancelled' });
    }

    for (const item of booking.BookingItems) {
      await Seat.update({ seat_status: 'available' }, { where: { seat_id: item.seat_id }, transaction });
    }

    // ✅ Invalidate the ticket immediately
    await Ticket.update({ is_valid: false }, { where: { booking_id: booking.booking_id }, transaction });

    await booking.update({ booking_status: 'cancelled' }, { transaction });
    await transaction.commit();

    res.json({ success: true, message: 'Booking cancelled successfully' });
  } catch (error) {
    await transaction.rollback();
    console.error('Cancel booking error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to cancel booking' });
  }
};