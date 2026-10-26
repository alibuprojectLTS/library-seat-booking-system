import { Booking } from '../models/index.js';
import { Op } from 'sequelize';

/**
 * Finance — Get Revenue Reports
 */
export const getFinancialReport = async (req, res) => {
  try {
    const { period } = req.query; // 'daily', 'weekly', 'monthly'

    let startDate = new Date();
    if (period === 'weekly') startDate.setDate(startDate.getDate() - 7);
    if (period === 'monthly') startDate.setMonth(startDate.getMonth() - 1);

    const revenue = await Booking.sum('total_amount', {
      where: {
        booking_status: 'paid',
        created_at: { [Op.gte]: startDate }
      }
    });

    const totalTickets = await Booking.sum('total_seats', {
      where: {
        booking_status: 'paid',
        created_at: { [Op.gte]: startDate }
      }
    });

    // Split by Online vs Cash
    const onlineRevenue = await Booking.sum('total_amount', {
      where: { booking_status: 'paid', payment_method: 'online', created_at: { [Op.gte]: startDate } }
    });

    const cashRevenue = await Booking.sum('total_amount', {
      where: { booking_status: 'paid', payment_method: 'cash', created_at: { [Op.gte]: startDate } }
    });

    res.json({
      success: true,
      report: {
        period,
        totalRevenue: Number(revenue || 0),
        totalTicketsSold: Number(totalTickets || 0),
        onlineRevenue: Number(onlineRevenue || 0),
        cashRevenue: Number(cashRevenue || 0)
      }
    });

  } catch (error) {
    console.error('Finance report error:', error);
    res.status(500).json({ success: false, message: 'Failed to get report' });
  }
};