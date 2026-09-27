import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

const sendViaBrevo = async (emailData) => {
  try {
    const response = await axios.post(BREVO_API_URL, emailData, {
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json',
      },
    });
    console.log('✅ Email sent:', response.data.messageId);
    return { success: true, messageId: response.data.messageId };
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    console.error('❌ Email error:', errorMsg);
    return { success: false, error: errorMsg };
  }
};

export const sendBookingConfirmation = async (user, booking, ticket, seats) => {
  const seatList = seats.map((s) => s.seat_label).join(', ');

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
    </div>
  `;

  return sendViaBrevo({
    subject: `Booking Confirmation #${booking.booking_id}`,
    htmlContent: html,
    sender: {
      name: 'Library Seat Booking',
      email: process.env.BREVO_SENDER_EMAIL,
    },
    to: [{ email: user.email, name: user.first_name }],
  });
};

export const sendEmail = async ({ to, subject, html, text }) => {
  return sendViaBrevo({
    subject,
    htmlContent: html,
    textContent: text,
    sender: {
      name: 'Library Seat Booking',
      email: process.env.BREVO_SENDER_EMAIL,
    },
    to: [{ email: to }],
  });
};