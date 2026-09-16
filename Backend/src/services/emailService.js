import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

/**
 * Send booking confirmation email
 */
export const sendBookingConfirmation = async (user, booking, ticket, seats) => {
  try {
    const seatList = seats.map(s => s.seat_label).join(', ');

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1e40af;">📚 Booking Confirmation</h1>
        <p>Hello ${user.first_name},</p>
        <p>Your booking has been confirmed!</p>

        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Booking Details</h3>
          <p><strong>Booking ID:</strong> #${booking.booking_id}</p>
          <p><strong>Date:</strong> ${booking.booking_date}</p>
          <p><strong>Seats:</strong> ${seatList}</p>
          <p><strong>Total Seats:</strong> ${booking.total_seats}</p>
          <p><strong>Total Amount:</strong> MK ${booking.total_amount}</p>
        </div>

        <div style="text-align: center; margin: 20px 0;">
          <h3>Your Ticket</h3>
          <p><strong>Ticket Code:</strong> ${ticket.ticket_code}</p>
          <img src="${ticket.qr_code_data}" alt="QR Code" style="width: 200px; height: 200px;" />
          <p>Show this QR code at the library entrance</p>
        </div>

        <p>Thank you for using Library Seat Booking System!</p>
        <p style="color: #6b7280; font-size: 12px;">This is an automated message. Please do not reply.</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: `✅ Booking Confirmation #${booking.booking_id}`,
      html
    });

    console.log('✅ Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send generic email
 */
export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
      text
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email error:', error);
    return { success: false, error: error.message };
  }
};