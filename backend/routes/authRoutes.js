const express = require("express");
const router = express.Router();
const cors = require("cors");
const { test, registerUser,loginUser } = require("../controllers/authControllers");
const { initiatePayment ,capturePayment } = require("../controllers/paymentControllers");
const sendEmail = require("../controllers/emailController");

router.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, 
}));

router.get("/", test);
router.post("/register", registerUser);
router.post("/login", loginUser);

router.post('/payment/initiate', initiatePayment);
router.post('/payment/capture', capturePayment);
router.post('/email', sendEmail);

module.exports = router;
