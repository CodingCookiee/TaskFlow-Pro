import { hash } from 'bcryptjs';
import prisma from '../../../utils/prisma';

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password.length >= 8 && 
         /[A-Z]/.test(password) && 
         /[a-z]/.test(password) && 
         /[0-9]/.test(password) &&
         /[!@#$%^&*(),.?":{}|<>]/.test(password);
};

const validateName = (name) => {
  return name.length >= 2 && name.length <= 15 && /^[a-zA-Z\s]*$/.test(name);
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      message: 'Method not allowed' 
    });
  }

  const { name, email, password } = req.body;

  // Check for missing fields
  if (!email || !password || !name) {
    return res.status(400).json({ 
      success: false,
      message: 'All fields are required' 
    });
  }

  // Validate name
  if (!validateName(name)) {
    return res.status(400).json({ 
      success: false,
      message: 'Name must be between 2 and 15 characters and contain only letters' 
    });
  }

  // Validate email
  if (!validateEmail(email)) {
    return res.status(400).json({ 
      success: false,
      message: 'Please enter a valid email address' 
    });
  }

  // Validate password
  if (!validatePassword(password)) {
    return res.status(400).json({ 
      success: false,
      message: 'Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters' 
    });
  }

  try {
    // Check for existing user
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'Email already registered' 
      });
    }

    // Hash password and create user
    const hashedPassword = await hash(password, 12);
    
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      user
    });

  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Error creating account',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
