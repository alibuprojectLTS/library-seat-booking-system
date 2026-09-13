import { LibraryStatus } from '../models/index.js';

export const getLibraryStatus = async (req, res) => {
  try {
    const status = await LibraryStatus.findOne({
      order: [['updated_at', 'DESC']]
    });

    if (!status) {
      return res.json({
        success: true,
        status: {
          current_state: 'open',
          capacity_used: 0,
          capacity_total: 0,
          message: 'Welcome to the library',
          open_hours: '8:00 AM - 6:00 PM'
        }
      });
    }

    res.json({
      success: true,
      status
    });
  } catch (error) {
    console.error('Get library status error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch library status'
    });
  }
};