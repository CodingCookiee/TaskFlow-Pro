import { hash } from 'bcryptjs';
import prisma from '../../../utils/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const hashedPassword = await hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 'P2002' && error.meta && error.meta.target.includes('email')) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      res.status(500).json({ message: 'User creation failed', error: error.message });
    }
  }
}