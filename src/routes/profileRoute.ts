import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { validationResult } from 'express-validator'
import { upload } from '../middlewares/uploadMiddleware'
import { authMiddleware } from '../middlewares/authMiddleware'

const prisma = new PrismaClient()

const router = Router()

router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { id } = req.params

  const user = await prisma.user.findUnique({ where: { id: Number(id) } })

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  res.json(user)
})

router.put(
  '/:id',
  authMiddleware,
  upload.single('photo'),
  async (req: Request, res: Response) => {
    const { id } = req.params
    const { firstName, lastName, gender } = req.body
    const file = req.file

    try {
      const user = await prisma.user.update({
        where: { id: Number(id) },
        data: {
          firstName,
          lastName,
          gender,
          photo: file?.filename,
        },
      })
      res.json(user)
    } catch (error) {
      res.status(400).json({ error: 'User not found' })
    }
  }
)

export default router
