import { Query, QueryReply, User } from '../models/index.js';

/**
 * Submit a new query
 */
export const submitQuery = async (req, res) => {
  try {
    const { subject, message, category, priority } = req.body;
    const userId = req.user.userId;

    if (!subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Subject and message are required'
      });
    }

    const query = await Query.create({
      user_id: userId,
      subject,
      message,
      category: category || 'general',
      priority: priority || 'normal',
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Query submitted successfully',
      query
    });
  } catch (error) {
    console.error('Submit query error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit query'
    });
  }
};

/**
 * Get user's queries
 */
export const getMyQueries = async (req, res) => {
  try {
    const userId = req.user.userId;

    const queries = await Query.findAll({
      where: { user_id: userId },
      include: [
        {
          model: QueryReply,
          include: [
            { model: User, attributes: ['first_name', 'last_name', 'role'] }
          ]
        }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      queries
    });
  } catch (error) {
    console.error('Get my queries error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch queries'
    });
  }
};