import { body } from 'express-validator'

// email, password, firstName
export const registerValidator = [
  body('email', 'invalid email').isEmail(),
  body('email', 'email length is not correct (1-191 chars)').isLength({
    min: 1,
    max: 191,
  }),
  body('firstName', 'firstName length is not correct (1-191 chars)').isLength({
    min: 1,
    max: 191,
  }),
  body('password', 'password length is not correct (1-191 chars)').isLength({
    min: 1,
    max: 191,
  }),
]

// email, password
export const loginValidator = [body('email', 'invalid email').isEmail()]
