import * as brevo from '@getbrevo/brevo';
import dotenv from 'dotenv';
dotenv.config();

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

/**
 * Send booking confirmation email
 */
export const sendBookingConfirmation = async (user, booking, ticket, seats) => {
  try {
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

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.subject = `Booking Confirmation #${booking.booking_id}`;
    sendSmtpEmail.htmlContent = html;
    sendSmtpEmail.sender = {
      name: 'Library Seat Booking',
      email: process.env.BREVO_SENDER_EMAIL || 'leojamu21@gmail.com',
    };
    sendSmtpEmail.to = [{ email: user.email, name: user.first_name }];

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('✅ Email sent:', data.messageId);
    return { success: true, messageId: data.messageId };
  } catch (error) {
    console.error('❌ Email error:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Send generic email
 */
export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = html;
    sendSmtpEmail.textContent = text;
    sendSmtpEmail.sender = {
  name: 'Library Seat Booking',
  email: process.env.BREVO_SENDER_EMAIL || 'alibuprojectlts@gmail.com',
};
    sendSmtpEmail.to = [{ email: to }];

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return { success: true, messageId: data.messageId };
  } catch (error) {
    console.error('❌ Email error:', error.message);
    return { success: false, error: error.message };
  }
};