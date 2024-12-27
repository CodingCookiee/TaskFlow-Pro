import { getSession } from 'next-auth/react';
import prisma from '../../../utils/prisma';

export default async function handler(req, res) {
  const { id } = req.query;
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const task = await prisma.task.findUnique({
        where: { id: Number(id) },
      });
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      console.error('Error fetching task:', error);
      res.status(500).json({ error: 'Failed to fetch task', details: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const task = await prisma.task.findUnique({
        where: { id: Number(id) },
      });
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      await prisma.task.delete({
        where: { id: Number(id) },
      });
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'Failed to delete task', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}