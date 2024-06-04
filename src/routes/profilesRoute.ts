import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware } from '../middlewares/authMiddleware'

const prisma = new PrismaClient()

const router = Router()

router.get('/', authMiddleware, async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1
  const take = 10
  const skip = (page - 1) * take

  const users = await prisma.user.findMany({
    take,
    skip,
    orderBy: { created_at: 'desc' },
  })

  return res.json(users)
})

export default router
