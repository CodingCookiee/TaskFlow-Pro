import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from '../../../utils/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { title, description, dueDate, priority } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description: description || '',
        dueDate: dueDate ? new Date(dueDate) : null,
        priority: priority || 'medium',
        userId: session.user.id
      }
    });

    return res.status(201).json({
      success: true,
      data: task
    });

  } catch (error) {
    return res.status(500).json({ 
      success: false,
      message: 'Failed to create task',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
