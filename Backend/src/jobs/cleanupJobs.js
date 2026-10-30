import cron from 'node-cron';
import { Ticket } from '../models/index.js';
import { Op } from 'sequelize';

export const startCleanupJobs = () => {
  // ✅ Runs every day at midnight (00:00)
  cron.schedule('0 0 * * *', async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Find tickets that are past their valid date and were NOT checked in
      const deleted = await Ticket.destroy({
        where: {
          valid_date: { [Op.lt]: today },
          checked_in: false
        }
      });

      if (deleted > 0) {
        console.log(`🧹 Cleanup Job: Permanently deleted ${deleted} expired, unchecked-in tickets.`);
      }
    } catch (error) {
      console.error('Cleanup Job Error:', error);
    }
  });
  
  console.log('⏰ Cleanup Cron Job Scheduled (Runs daily at midnight).');
};