import { User, Query, QueryReply, Announcement, LibraryStatus, Booking, Seat } from '../models/index.js';
import { Op } from 'sequelize';

/**
 * Get dashboard stats
 */
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.count({ where: { role: 'user' } });
    const totalSeats = await Seat.count();
    const availableSeats = await Seat.count({ where: { seat_status: 'available' } });
    const bookedSeats = await Seat.count({ where: { seat_status: 'booked' } });

    // Total bookings = only PAID
    const totalBookings = await Booking.count({
      where: { booking_status: 'paid' }
    });

    // Total revenue = sum of paid bookings
    const revenueResult = await Booking.sum('total_amount', {
      where: { booking_status: 'paid' }
    });
    const totalRevenue = Number(revenueResult) || 0;

    const pendingQueries = await Query.count({ where: { status: 'pending' } });

    const today = new Date().toISOString().split('T')[0];
    const todayBookings = await Booking.count({
      where: {
        booking_date: today,
        booking_status: 'paid'
      }
    });

    const inactiveThreshold = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const inactiveUsers = await User.count({
      where: {
        role: 'user',
        last_login: { [Op.lt]: inactiveThreshold }
      }
    });

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalSeats,
        availableSeats,
        bookedSeats,
        totalBookings,
        todayBookings,
        pendingQueries,
        inactiveUsers,
        totalRevenue,
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch stats'
    });
  }
};

/**
 * Get all queries (Admin)
 */
export const getAllQueries = async (req, res) => {
  try {
    const { status, priority } = req.query;

    const whereClause = {};
    if (status && status !== 'all') whereClause.status = status;
    if (priority && priority !== 'all') whereClause.priority = priority;

    const queries = await Query.findAll({
      where: whereClause,
      include: [
        { model: User, attributes: ['user_id', 'first_name', 'last_name', 'email'] },
        { model: QueryReply, include: [{ model: User, attributes: ['first_name', 'last_name', 'role'] }] }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      queries
    });
  } catch (error) {
    console.error('Get all queries error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch queries'
    });
  }
};

/**
 * Reply to a query (Admin)
 */
export const replyToQuery = async (req, res) => {
  try {
    const { id } = req.params;
    const { message, status, is_internal } = req.body;
    const adminId = req.user.userId;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    const query = await Query.findByPk(id);
    if (!query) {
      return res.status(404).json({
        success: false,
        message: 'Query not found'
      });
    }

    const reply = await QueryReply.create({
      query_id: id,
      sender_id: adminId,
      sender_type: 'admin',
      message,
      is_internal: is_internal || false
    });

    await query.update({
      admin_id: adminId,
      status: status || 'in_progress'
    });

    res.json({
      success: true,
      message: 'Reply sent successfully',
      reply
    });
  } catch (error) {
    console.error('Reply to query error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to reply'
    });
  }
};

/**
 * Delete inactive users (7+ days)
 */
export const deleteInactiveUsers = async (req, res) => {
  try {
    const threshold = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const inactiveUsers = await User.findAll({
      where: {
        role: 'user',
        last_login: { [Op.lt]: threshold }
      }
    });

    if (inactiveUsers.length === 0) {
      return res.json({
        success: true,
        message: 'No inactive users found',
        deletedCount: 0
      });
    }

    const ids = inactiveUsers.map(u => u.user_id);

    await User.update(
      { is_active: false },
      { where: { user_id: ids } }
    );

    res.json({
      success: true,
      message: `Deactivated ${inactiveUsers.length} inactive users`,
      deletedCount: inactiveUsers.length
    });
  } catch (error) {
    console.error('Delete inactive users error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete inactive users'
    });
  }
};

/**
 * Post announcement (Admin)
 */
export const createAnnouncement = async (req, res) => {
  try {
    const { title, content, announcement_type, priority, is_pinned, expires_at } = req.body;
    const adminId = req.user.userId;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }

    const announcement = await Announcement.create({
      admin_id: adminId,
      title,
      content,
      announcement_type: announcement_type || 'general',
      priority: priority || 'normal',
      is_pinned: is_pinned || false,
      expires_at: expires_at || null,
      is_active: true
    });

    res.status(201).json({
      success: true,
      message: 'Announcement created successfully',
      announcement
    });
  } catch (error) {
    console.error('Create announcement error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create announcement'
    });
  }
};

/**
 * Get all announcements (Admin — includes inactive + expired)
 */
export const getAllAnnouncementsAdmin = async (req, res) => {
  try {
    const announcements = await Announcement.findAll({
      include: [
        { model: User, attributes: ['first_name', 'last_name'] }
      ],
      order: [
        ['is_pinned', 'DESC'],
        ['created_at', 'DESC']
      ]
    });

    res.json({
      success: true,
      announcements
    });
  } catch (error) {
    console.error('Get all announcements error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch announcements'
    });
  }
};

/**
 * Update announcement (Admin)
 */
export const updateAnnouncementAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      content,
      announcement_type,
      priority,
      is_pinned,
      is_active,
      expires_at
    } = req.body;

    const announcement = await Announcement.findByPk(id);
    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    await announcement.update({
      title: title ?? announcement.title,
      content: content ?? announcement.content,
      announcement_type: announcement_type ?? announcement.announcement_type,
      priority: priority ?? announcement.priority,
      is_pinned: is_pinned ?? announcement.is_pinned,
      is_active: is_active ?? announcement.is_active,
      expires_at: expires_at !== undefined ? expires_at : announcement.expires_at
    });

    res.json({
      success: true,
      message: 'Announcement updated successfully',
      announcement
    });
  } catch (error) {
    console.error('Update announcement error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update announcement'
    });
  }
};

/**
 * Delete announcement (Admin)
 */
export const deleteAnnouncementAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const announcement = await Announcement.findByPk(id);
    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    await announcement.destroy();

    res.json({
      success: true,
      message: 'Announcement deleted successfully'
    });
  } catch (error) {
    console.error('Delete announcement error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete announcement'
    });
  }
};

/**
 * Update library status (Admin)
 */
export const updateLibraryStatus = async (req, res) => {
  try {
    const { current_state, capacity_used, capacity_total, message, open_hours } = req.body;
    const adminId = req.user.userId;

    let status = await LibraryStatus.findOne({
      order: [['updated_at', 'DESC']]
    });

    if (!status) {
      status = await LibraryStatus.create({
        current_state: current_state || 'open',
        capacity_used: capacity_used || 0,
        capacity_total: capacity_total || 0,
        message: message || '',
        open_hours: open_hours || '8:00 AM - 6:00 PM',
        updated_by: adminId
      });
    } else {
      await status.update({
        current_state: current_state || status.current_state,
        capacity_used: capacity_used ?? status.capacity_used,
        capacity_total: capacity_total ?? status.capacity_total,
        message: message ?? status.message,
        open_hours: open_hours ?? status.open_hours,
        updated_by: adminId
      });
    }

    res.json({
      success: true,
      message: 'Library status updated successfully',
      status
    });
  } catch (error) {
    console.error('Update library status error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update status'
    });
  }
};

/**
 * Add seat manually (Admin)
 */
export const addSeat = async (req, res) => {
  try {
    const { section_id, seat_label, row_number, column_number, seat_status } = req.body;

    if (!section_id || !seat_label) {
      return res.status(400).json({
        success: false,
        message: 'section_id and seat_label are required'
      });
    }

    const existing = await Seat.findOne({
      where: { section_id, seat_label }
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Seat already exists in this section'
      });
    }

    const seat = await Seat.create({
      section_id,
      seat_label,
      row_number: row_number || null,
      column_number: column_number || null,
      seat_status: seat_status || 'available'
    });

    res.status(201).json({
      success: true,
      message: 'Seat added successfully',
      seat
    });
  } catch (error) {
    console.error('Add seat error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to add seat'
    });
  }
};

/**
 * Update seat (Admin)
 */
export const updateSeat = async (req, res) => {
  try {
    const { id } = req.params;
    const { seat_label, row_number, column_number, seat_status } = req.body;

    const seat = await Seat.findByPk(id);
    if (!seat) {
      return res.status(404).json({
        success: false,
        message: 'Seat not found'
      });
    }

    await seat.update({
      seat_label: seat_label ?? seat.seat_label,
      row_number: row_number ?? seat.row_number,
      column_number: column_number ?? seat.column_number,
      seat_status: seat_status ?? seat.seat_status
    });

    res.json({
      success: true,
      message: 'Seat updated successfully',
      seat
    });
  } catch (error) {
    console.error('Update seat error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update seat'
    });
  }
};

/**
 * Delete seat (Admin)
 */
export const deleteSeat = async (req, res) => {
  try {
    const { id } = req.params;

    const seat = await Seat.findByPk(id);
    if (!seat) {
      return res.status(404).json({
        success: false,
        message: 'Seat not found'
      });
    }

    await seat.destroy();

    res.json({
      success: true,
      message: 'Seat deleted successfully'
    });
  } catch (error) {
    console.error('Delete seat error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete seat'
    });
  }
};