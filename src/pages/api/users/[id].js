import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id;

  switch (req.method) {
    case 'GET':
      try {
        const user = await prisma.user.findUnique({
          where: { id: userId },
        });
        return res.status(200).json(user);
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching user data' });
      }

    case 'PUT':
      try {
        const { name, email } = req.body;
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: { name, email },
        });
        return res.status(200).json(updatedUser);
      } catch (error) {
        return res.status(500).json({ message: 'Error updating user data' });
      }

    case 'DELETE':
      try {
        await prisma.user.delete({
          where: { id: userId },
        });
        return res.status(204).end();
      } catch (error) {
        return res.status(500).json({ message: 'Error deleting user' });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}