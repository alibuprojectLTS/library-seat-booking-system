import fs from 'fs';
import csv from 'csv-parser';

/**
 * Parse CSV file
 */
export const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const errors = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        // Validate required columns
        if (!row.seat_label) {
          errors.push(`Missing seat_label in row: ${JSON.stringify(row)}`);
          return;
        }

        results.push({
          seat_label: row.seat_label.trim(),
          row_number: row.row_number ? parseInt(row.row_number) : null,
          column_number: row.column_number ? parseInt(row.column_number) : null,
          seat_status: ['available', 'deactivated'].includes(row.seat_status)
            ? row.seat_status
            : 'available'
        });
      })
      .on('end', () => {
        resolve({ rows: results, errors });
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};