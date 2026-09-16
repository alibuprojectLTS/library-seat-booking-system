import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const PAYCHANGU_API_URL = process.env.PAYCHANGU_API_URL || 'https://api.paychangu.com';
const PAYCHANGU_SECRET_KEY = process.env.PAYCHANGU_SECRET_KEY;

class PaymentService {
  /**
   * Initiate payment with PayChangu
   */
  static async initiatePayment({ amount, bookingId, userId, description, redirectUrl, cancelUrl }) {
    try {
      const txRef = `LIB-${bookingId}-${Date.now()}`;

      const response = await axios.post(
        `${PAYCHANGU_API_URL}/payment`,
        {
          amount: amount,
          currency: 'MWK',
          transaction_reference: txRef,
          customer_name: `User ${userId}`,
          customer_email: `user${userId}@library.com`,
          description: description,
          redirect_url: redirectUrl,
          cancel_url: cancelUrl,
          callback_url: `${process.env.API_URL}/api/payments/webhook`
        },
        {
          headers: {
            'Authorization': `Bearer ${PAYCHANGU_SECRET_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      if (response.data.status === 'success') {
        // ✅ Use PayChangu's tx_ref if available (fallback to ours)
        const paychanguTxRef = response.data.data?.tx_ref || txRef;

        return {
          success: true,
          checkoutUrl: response.data.data.checkout_url,
          txRef: paychanguTxRef, // ← Return PayChangu's ref
          paymentId: response.data.data.payment_id
        };
      }

      return {
        success: false,
        message: response.data.message || 'Payment initiation failed'
      };
    } catch (error) {
      console.error('PayChangu initiation error:', error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Payment initiation failed'
      };
    }
  }

  /**
   * Verify payment with PayChangu
   */
  static async verifyPayment(txRef) {
    try {
      const response = await axios.get(
        `${PAYCHANGU_API_URL}/verify-payment/${txRef}`,
        {
          headers: {
            'Authorization': `Bearer ${PAYCHANGU_SECRET_KEY}`,
            'Accept': 'application/json'
          }
        }
      );

      if (response.data.status === 'success' && response.data.data?.status === 'success') {
        return {
          success: true,
          status: 'success',
          amount: response.data.data.amount,
          txRef: txRef
        };
      }

      return {
        success: false,
        status: response.data.data?.status || 'failed',
        message: response.data.message || 'Payment verification failed'
      };
    } catch (error) {
      console.error('PayChangu verification error:', error.response?.data || error.message);
      return {
        success: false,
        status: 'failed',
        message: error.response?.data?.message || error.message || 'Payment verification failed'
      };
    }
  }
}

export default PaymentService;