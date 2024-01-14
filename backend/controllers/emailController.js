const nodemailer = require("nodemailer");

const sendEmail =async (req, res) => {
    try {
      const { itemName, quantity } = req.body;
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.ADMIN_EMAIL,
          pass: process.env.ADMIN_PASS,
        },
      });
      const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: 'rishbaskarabh359@gmail.com',
        subject: 'Inventory Warning',
        text: `Item ${itemName} is running low. Quantity is now ${quantity}.`,
      };
      const info = await transporter.sendMail(mailOptions);
  
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  module.exports=sendEmail;