import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const PAYCHANGU_API_URL = 'https://api.paychangu.com';

const PAYCHANGU_SECRET_KEY = process.env.PAYCHANGU_SECRET_KEY;

class PaymentService {
  /**
   * Initiate payment with PayChangu
   */
  static async initiatePayment({ amount, bookingId, userId, description, redirectUrl, cancelUrl }) {
    try {
      const txRef = `LIB-${bookingId}-${Date.now()}`;
      const callbackUrl = `${process.env.API_URL}/api/payments/webhook`;

      console.log('🔗 Callback URL:', callbackUrl);
      console.log('🔗 Return URL:', redirectUrl);
      console.log('🔗 API URL:', PAYCHANGU_API_URL);

      const response = await axios.post(
        `${PAYCHANGU_API_URL}/payment`,
        {
          amount: amount,
          currency: 'MWK',
          transaction_reference: txRef,
          customer_name: `User ${userId}`,
          customer_email: `user${userId}@library.com`,
          description: description,
          return_url: redirectUrl,        // ✅ FIXED: was redirect_url
          cancel_url: cancelUrl,
          callback_url: callbackUrl
        },
        {
          headers: {
            'Authorization': `Bearer ${PAYCHANGU_SECRET_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      console.log('PayChangu response:', JSON.stringify(response.data, null, 2));

      if (response.data.status === 'success') {
        // ✅ Save BOTH refs — use ours for querying, but store PayChangu's for webhook matching
        const paychanguTxRef = response.data.data?.data?.tx_ref || txRef;
        return {
          success: true,
          checkoutUrl: response.data.data.checkout_url,
          txRef: paychanguTxRef,
          localTxRef: txRef, // Keep local ref too
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
      console.log('🔍 Verifying txRef:', txRef);

      const response = await axios.get(
        `${PAYCHANGU_API_URL}/verify-payment/${txRef}`,
        {
          headers: {
            'Authorization': `Bearer ${PAYCHANGU_SECRET_KEY}`,
            'Accept': 'application/json'
          }
        }
      );

      console.log('Verify response:', JSON.stringify(response.data, null, 2));

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

export default PaymentService