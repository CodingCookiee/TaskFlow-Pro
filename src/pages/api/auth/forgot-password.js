import prisma from '../../../utils/prisma';
import jwt from 'jsonwebtoken';
import { createTransport } from 'nodemailer';

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    const user = await prisma.user.findUnique({ 
      where: { email },
      select: { id: true, email: true }
    });

    if (!user) {
      return res.status(404).json({ message: 'No account found with this email' });
    }

    const resetToken = jwt.sign(
      { userId: user.id },
      process.env.NEXTAUTH_SECRET,
      { expiresIn: '15m' }
    );

    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;

    const transporter = createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: 'Password Reset - TaskFlow Pro',
      html: `
        <h1>Password Reset Request</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 15 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ 
      success: true,
      message: 'Password reset link sent to your email' 
    });

  } catch (error) {
    console.error('Password reset error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Failed to send reset link' 
    });
  }
}
