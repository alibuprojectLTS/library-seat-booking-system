import { Announcement, User } from '../models/index.js';

export const getActiveAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.findAll({
      where: {
        is_active: true,
        [Op.or]: [
          { expires_at: null },
          { expires_at: { [Op.gt]: new Date() } }
        ]
      },
      include: [
        {
          model: User,
          attributes: ['first_name', 'last_name']
        }
      ],
      order: [
        ['is_pinned', 'DESC'],
        ['priority', 'DESC'],
        ['created_at', 'DESC']
      ]
    });

    res.json({
      success: true,
      announcements
    });
  } catch (error) {
    console.error('Get announcements error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch announcements'
    });
  }
};