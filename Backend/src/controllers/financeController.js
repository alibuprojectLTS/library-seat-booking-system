import { Booking, User } from '../models/index.js';
import { Op } from 'sequelize';

/**
 * Finance — Get Revenue Reports & Payment List
 */
export const getFinancialReport = async (req, res) => {
  try {
    const { period } = req.query; // 'daily', 'weekly', 'monthly'

    const now = new Date();
    let startDate = new Date();

    if (period === 'weekly') {
      startDate.setDate(now.getDate() - 7);
    } else if (period === 'monthly') {
      startDate.setMonth(now.getMonth() - 1);
    }
    
    startDate.setHours(0, 0, 0, 0);

    // 1. Get the summarized stats (ONLY PAID)
    const revenue = await Booking.sum('total_amount', {
      where: { booking_status: 'paid', created_at: { [Op.gte]: startDate } }
    });

    const totalTickets = await Booking.sum('total_seats', {
      where: { booking_status: 'paid', created_at: { [Op.gte]: startDate } }
    });

    const onlineRevenue = await Booking.sum('total_amount', {
      where: { booking_status: 'paid', payment_method: 'online', created_at: { [Op.gte]: startDate } }
    });

    const cashRevenue = await Booking.sum('total_amount', {
      where: { booking_status: 'paid', payment_method: 'cash', created_at: { [Op.gte]: startDate } }
    });

    // 2. Get the detailed list of who paid, cancelled, or refunded
    // ✅ ADDED 'cancelled' to the status array
    const paymentsList = await Booking.findAll({
      where: { 
        booking_status: ['paid', 'refunded', 'cancelled'], 
        created_at: { [Op.gte]: startDate } 
      },
      include: [{ model: User, attributes: ['first_name', 'last_name', 'email'] }],
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      report: {
        period,
        totalRevenue: Number(revenue || 0),
        totalTicketsSold: Number(totalTickets || 0),
        onlineRevenue: Number(onlineRevenue || 0),
        cashRevenue: Number(cashRevenue || 0),
        payments: paymentsList
      }
    });

  } catch (error) {
    console.error('Finance report error:', error);
    res.status(500).json({ success: false, message: 'Failed to get report' });
  }
};

/**
 * Process Refund
 */
export const processRefund = async (req, res) => {
  try {
    const { booking_id } = req.body;
    
    const booking = await Booking.findByPk(booking_id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    if (booking.booking_status !== 'paid') return res.status(400).json({ success: false, message: 'Only paid bookings can be refunded' });

    await booking.update({ booking_status: 'refunded' });

    // Note: In a real production app, you would trigger an email here using your sendEmail service.
    
    res.json({ success: true, message: 'Refund processed successfully' });
  } catch (error) {
    console.error('Refund error:', error);
    res.status(500).json({ success: false, message: 'Failed to process refund' });
  }
};