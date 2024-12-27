import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { id } = req.query;

    switch (req.method) {
        case 'GET':
            const task = await prisma.task.findUnique({
                where: { id: Number(id) },
            });
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            return res.status(200).json(task);

        case 'PUT':
            const updatedTask = await prisma.task.update({
                where: { id: Number(id) },
                data: req.body,
            });
            return res.status(200).json(updatedTask);

        case 'DELETE':
            await prisma.task.delete({
                where: { id: Number(id) },
            });
            return res.status(204).end();

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}