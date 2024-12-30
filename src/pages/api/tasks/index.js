import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from '../../../utils/prisma';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  switch (req.method) {
    case 'GET':
      const tasks = await prisma.task.findMany({
        where: {
          userId: session.user.id
        },
        orderBy: {
          createdAt: 'desc'
        },
      
      });
      return res.json(tasks);

    case 'POST':
      const newTask = await prisma.task.create({
        data: {
          title: req.body.title,
          description: req.body.description,
          userId: session.user.id
        }
      });
      return res.status(201).json(newTask);

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}