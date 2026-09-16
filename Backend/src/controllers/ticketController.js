import { Ticket, Booking, BookingItem, Seat } from '../models/index.js';

/**
 * Get user's tickets
 */
export const getMyTickets = async (req, res) => {
  try {
    const userId = req.user.userId;

    const tickets = await Ticket.findAll({
      include: [
        {
          model: Booking,
          where: { user_id: userId },
          include: [
            {
              model: BookingItem,
              include: [Seat]
            }
          ]
        }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      tickets
    });
  } catch (error) {
    console.error('Get my tickets error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch tickets'
    });
  }
};

/**
 * Get single ticket by ID
 */
export const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const ticket = await Ticket.findOne({
      where: { ticket_id: id },
      include: [
        {
          model: Booking,
          where: { user_id: userId },
          include: [
            {
              model: BookingItem,
              include: [Seat]
            }
          ]
        }
      ]
    });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
    }

    res.json({
      success: true,
      ticket
    });
  } catch (error) {
    console.error('Get ticket error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch ticket'
    });
  }
};