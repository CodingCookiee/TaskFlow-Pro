import prisma from '../../../utils/prisma';
import jwt from 'jsonwebtoken';
import { hash } from 'bcryptjs';

const validatePassword = (password) => {
  return password.length >= 8 && 
         /[A-Z]/.test(password) && 
         /[a-z]/.test(password) && 
         /[0-9]/.test(password) &&
         /[!@#$%^&*(),.?":{}|<>]/.test(password);
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { token, newPassword } = req.body;

  if (!validatePassword(newPassword)) {
    return res.status(400).json({ 
      message: 'Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters'
    });
  }

  try {
    const { userId } = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    const hashedPassword = await hash(newPassword, 12);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });

    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({ 
      message: 'Error resetting password',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
