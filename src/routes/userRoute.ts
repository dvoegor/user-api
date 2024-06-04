import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { loginValidator, registerValidator } from '../validators/userValidator'
import { validationResult } from 'express-validator'

const prisma = new PrismaClient()

const router = Router()

router.post(
  '/register',
  registerValidator,
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password, firstName } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
        },
      })
      return res.status(201).json(user)
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message })
    }
  }
)

router.post('/login', loginValidator, async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'invalid email or password' })
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  )

  return res.json({ token })
})

export default router
