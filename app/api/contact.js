import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, subject, phone, message } = req.body;

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'Outlook', // You can use other services as well
      auth: {
        user: process.env.EMAIL_USERNAME, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password
      },
    });

    // Email options
    const mailOptions = {
      from: email,
      to: 'kismel_aibot@outlook.com',
      subject: `New Contact Form Submission: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
      `,
    };

    try {
      // Send email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error sending email', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
