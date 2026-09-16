// In initiatePayment function, update the Payment.create block:

await Payment.create({
  booking_id: booking.booking_id,
  amount: booking.total_amount,
  payment_method: 'PayChangu',
  payment_status: 'pending',
  transaction_id: paymentData.txRef  // ✅ Already PayChangu's ref now
});

res.json({
  success: true,
  checkoutUrl: paymentData.checkoutUrl,
  txRef: paymentData.txRef,  // ✅ Returns PayChangu's ref
  amount: booking.total_amount,
  currency: 'MWK'
});