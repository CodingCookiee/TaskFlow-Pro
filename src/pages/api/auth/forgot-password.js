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
      select: { id: true, email: true },
      cacheStrategy: { ttl: 60 } 
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
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    try {
      await transporter.verify();
      
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: 'Password Reset - TaskFlow Pro',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333; text-align: center;">Password Reset Request</h1>
            <p>Hello,</p>
            <p>We received a request to reset your password. Click the button below to create a new password:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                style="background-color: #5724ff; color: white; padding: 12px 24px; 
                text-decoration: none; border-radius: 5px; display: inline-block;">
                Reset Password
              </a>
            </div>
            <p>This link will expire in 15 minutes for security reasons.</p>
            <p>If you didn't request this reset, you can safely ignore this email.</p>
            <p>Best regards,<br>TaskFlow Pro Team</p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      
      return res.status(200).json({ 
        success: true,
        message: 'Password reset link sent to your email' 
      });

    } catch (emailError) {
      console.error('Email sending error:', emailError);
      return res.status(500).json({ 
        success: false,
        message: 'Failed to send reset email',
        error: process.env.NODE_ENV === 'development' ? emailError.message : undefined
      });
    }

  } catch (error) {
    console.error('Password reset error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Failed to process reset request',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}