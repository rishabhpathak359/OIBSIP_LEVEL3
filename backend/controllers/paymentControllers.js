const Razorpay = require('razorpay');
const razorpay = new Razorpay({
  key_id: 'rzp_test_jIa5H7VXBb97vw',
  key_secret: 'U12HxDwbaxYHeHyDt3NVXzgE',
});

const initiatePayment = async (req, res) => {
  try {
    const totalAmountInPaise = req.body.totalAmount*100;
    console.log(totalAmountInPaise)
    const options = {
      amount: totalAmountInPaise ,
      currency: 'INR',
      receipt: 'receipt_order_123',
      payment_capture: 1, 
    };

    razorpay.orders.create(options, (err, order) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ err: 'Internal Server Error' });
      }
      res.json(order);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: 'Internal Server Error' });
  }
};

const capturePayment = async (req, res) => {
  const { paymentId, amount } = req.body;

  try {
    razorpay.payments.capture(paymentId, amount, (err, payment) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ err: 'Internal Server Error' });
      }
      res.json(payment);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: 'Internal Server Error' });
  }
};

module.exports = {
  initiatePayment,
  capturePayment,
};
