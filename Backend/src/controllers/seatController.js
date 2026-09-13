import { LibrarySection } from '../models/index.js';

export const getSections = async (req, res) => {
  try {
    const sections = await LibrarySection.findAll({
      where: { is_active: true },
      attributes: ['section_id', 'section_name', 'description', 'capacity', 'price_per_seat']
    });

    res.json({
      success: true,
      sections
    });
  } catch (error) {
    console.error('Get sections error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch sections'
    });
  }
};

// ============================================================
// SEATS - Will be added in Phase 3
// ============================================================
// export const getSeatsBySection = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const seats = await Seat.findAll({
//       where: { section_id: id },
//       attributes: ['seat_id', 'seat_label', 'row_number', 'column_number', 'seat_status']
//     });
//     res.json({
//       success: true,
//       seats
//     });
//   } catch (error) {
//     console.error('Get seats error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to fetch seats'
//     });
//   }
// };