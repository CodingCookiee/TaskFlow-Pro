import { getSession } from 'next-auth/react';
import prisma from '../../../utils/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const session = await getSession({ req });

      if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const tasks = await prisma.task.findMany({
        where: {
          userId: session.user.id,
        },
      });
      res.status(200).json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Failed to fetch tasks', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}