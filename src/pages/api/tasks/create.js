import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../utils/prisma';

export default async function createTask(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Task title is required' });
    }

    try {
      const newTask = await prisma.task.create({
        data: {
          title,
          userId: session.user.id,
        },
      });
      return res.status(201).json(newTask);
    } catch (error) {
      return res.status(500).json({ message: 'Error creating task', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}