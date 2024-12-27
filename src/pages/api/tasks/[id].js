import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from '../../../utils/prisma';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const { id } = req.query;

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const taskId = parseInt(id);
  
  switch (req.method) {
    case 'GET':
      const task = await prisma.task.findFirst({
        where: {
          id: taskId,
          userId: session.user.id
        }
      });
      
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      return res.json(task);

    case 'PUT':
      const updatedTask = await prisma.task.update({
        where: {
          id: taskId,
          userId: session.user.id
        },
        data: {
          title: req.body.title,
          description: req.body.description,
          completed: req.body.completed
        }
      });
      return res.json(updatedTask);

    case 'DELETE':
      await prisma.task.delete({
        where: {
          id: taskId,
          userId: session.user.id
        }
      });
      return res.status(204).end();

    case 'PATCH':
      const patchedTask = await prisma.task.update({
        where: {
          id: taskId,
          userId: session.user.id
        },
        data: req.body
      });
      return res.json(patchedTask);

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE', 'PATCH']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
