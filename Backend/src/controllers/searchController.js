import { Booking, BookingItem, Seat, User, Ticket } from '../models/index.js';
import { Op } from 'sequelize';

/**
 * Search bookings (Admin)
 */
export const searchBookings = async (req, res) => {
  try {
    const { seat_label, occupant_name, booking_id, user_email } = req.query;

    const bookingWhere = {};
    const userWhere = {};
    const seatWhere = {};

    if (booking_id) bookingWhere.booking_id = booking_id;
    if (user_email) userWhere.email = { [Op.iLike]: `%${user_email}%` };
    if (seat_label) seatWhere.seat_label = { [Op.iLike]: `%${seat_label}%` };

    const bookings = await Booking.findAll({
      where: bookingWhere,
      include: [
        {
          model: User,
          where: Object.keys(userWhere).length ? userWhere : undefined,
          attributes: ['user_id', 'first_name', 'last_name', 'email']
        },
        {
          model: BookingItem,
          where: occupant_name
            ? { occupant_name: { [Op.iLike]: `%${occupant_name}%` } }
            : undefined,
          include: [
            {
              model: Seat,
              where: Object.keys(seatWhere).length ? seatWhere : undefined
            }
          ]
        },
        { model: Ticket }
      ],
      order: [['created_at', 'DESC']],
      limit: 50
    });

    res.json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    console.error('Search bookings error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Search failed'
    });
  }
};