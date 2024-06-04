import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!)
    next()
  } catch {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}
