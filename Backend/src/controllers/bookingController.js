import { Booking, BookingItem, Seat, LibrarySection } from '../models/index.js';
import { sequelize } from '../models/index.js';

export const createBooking = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { booking_date, seats, occupants } = req.body;
    const userId = req.user.userId;

    // Validation
    if (!booking_date || !seats || !occupants) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'booking_date, seats, and occupants are required'
      });
    }

    if (seats.length !== occupants.length) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'Number of seats must match number of occupants'
      });
    }

    if (seats.length > 5) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'Maximum 5 seats per booking'
      });
    }

    // Check if seats are available
    for (const seatId of seats) {
      const seat = await Seat.findByPk(seatId, { transaction });
      if (!seat || seat.seat_status !== 'available') {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          message: `Seat ${seatId} is not available`
        });
      }
    }

    // Calculate total amount
    const totalAmount = seats.length * 200;

    // Create booking
    const booking = await Booking.create({
      user_id: userId,
      booking_date,
      booking_status: 'pending',
      total_seats: seats.length,
      total_amount: totalAmount,
      expires_at: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
    }, { transaction });

    // Create booking items and mark seats as booked
    for (let i = 0; i < seats.length; i++) {
      await BookingItem.create({
        booking_id: booking.booking_id,
        seat_id: seats[i],
        occupant_name: occupants[i]
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
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create booking'
    });
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
            {
              model: Seat,
              include: [
                {
                  model: LibrarySection,
                  attributes: ['section_id', 'section_name']
                }
              ]
            }
          ]
        }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      bookings
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch bookings'
    });
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
            {
              model: Seat,
              include: [
                {
                  model: LibrarySection,
                  attributes: ['section_id', 'section_name']
                }
              ]
            }
          ]
        }
      ]
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch booking'
    });
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
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.booking_status === 'cancelled') {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'Booking already cancelled'
      });
    }

    // Release seats
    for (const item of booking.BookingItems) {
      await Seat.update(
        { seat_status: 'available' },
        { where: { seat_id: item.seat_id }, transaction }
      );
    }

    // Update booking status
    await booking.update({ booking_status: 'cancelled' }, { transaction });

    await transaction.commit();

    res.json({
      success: true,
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to cancel booking'
    });
  }
};