import { Seat } from '../models/index.js';
import { parseCSV } from '../services/csvService.js';
import fs from 'fs';

/**
 * Upload seats via CSV (Admin)
 */
export const uploadSeatsCSV = async (req, res) => {
  try {
    const { section_id } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'CSV file is required'
      });
    }

    if (!section_id) {
      fs.unlinkSync(file.path);
      return res.status(400).json({
        success: false,
        message: 'section_id is required'
      });
    }

    // Parse CSV
    const { rows, errors } = await parseCSV(file.path);

    if (rows.length === 0) {
      fs.unlinkSync(file.path);
      return res.status(400).json({
        success: false,
        message: 'No valid rows found in CSV',
        errors
      });
    }

    // Insert seats
    let addedCount = 0;
    let skippedCount = 0;
    const skipReasons = [];

    for (const row of rows) {
      const existing = await Seat.findOne({
        where: { section_id, seat_label: row.seat_label }
      });

      if (existing) {
        skippedCount++;
        skipReasons.push(`Seat ${row.seat_label} already exists`);
        continue;
      }

      await Seat.create({
        section_id,
        seat_label: row.seat_label,
        row_number: row.row_number,
        column_number: row.column_number,
        seat_status: row.seat_status
      });

      addedCount++;
    }

    // Delete uploaded file
    fs.unlinkSync(file.path);

    res.json({
      success: true,
      message: 'CSV upload completed',
      summary: {
        total_rows: rows.length,
        added: addedCount,
        skipped: skippedCount,
        validation_errors: errors,
        skip_reasons: skipReasons
      }
    });
  } catch (error) {
    console.error('CSV upload error:', error);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload CSV'
    });
  }
};