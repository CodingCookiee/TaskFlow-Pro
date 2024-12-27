import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from '../../../utils/prisma';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const { id } = req.query;

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  switch (req.method) {
    case 'GET':
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        select: {
          id: true,
          email: true,
          name: true,
          image: true,
          tasks: {
            orderBy: { createdAt: 'desc' }
          }
        }
      });
      return res.status(200).json(user);

    case 'PUT':
      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: {
          name: req.body.name,
          image: req.body.image
        },
        select: {
          id: true,
          email: true,
          name: true,
          image: true
        }
      });
      return res.status(200).json(updatedUser);

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
