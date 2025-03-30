import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const points = await prisma.point.findMany();
      return res.status(200).json(points);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao recuperar pontos do banco de dados', error });
    }
  } else {
    return res.status(405).json({ message: 'Método não permitido' });
  }
}
