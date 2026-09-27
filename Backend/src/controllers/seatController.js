import { LibrarySection, Seat } from '../models/index.js';
import { fn, col } from 'sequelize';

export const getSections = async (req, res) => {
  try {
    const sections = await LibrarySection.findAll({
      where: { is_active: true },
      attributes: [
        'section_id',
        'section_name',
        'description',
        'capacity',
        'price_per_seat',
        [fn('COUNT', col('Seats.seat_id')), 'actual_seats'],
      ],
      include: [
        {
          model: Seat,
          attributes: [],
          required: false,
        },
      ],
      group: ['LibrarySection.section_id'],
      raw: true,
    });

    res.json({
      success: true,
      sections,
    });
  } catch (error) {
    console.error('Get sections error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch sections',
    });
  }
};

export const getSeatsBySection = async (req, res) => {
  try {
    const { id } = req.params;

    const seats = await Seat.findAll({
      where: { section_id: id },
      attributes: ['seat_id', 'seat_label', 'row_number', 'column_number', 'seat_status'],
    });

    res.json({
      success: true,
      seats,
    });
  } catch (error) {
    console.error('Get seats error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch seats',
    });
  }
};

export const getSeatStatus = async (req, res) => {
  try {
    const available = await Seat.count({ where: { seat_status: 'available' } });
    const booked = await Seat.count({ where: { seat_status: 'booked' } });
    const total = await Seat.count();

    res.json({
      success: true,
      data: {
        total,
        available,
        booked,
        occupancy: total > 0 ? Math.round((booked / total) * 100) : 0,
      },
    });
  } catch (error) {
    console.error('Seat status error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch seat status',
    });
  }
};