import express, { Application } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import userRoute from './routes/userRoute'
import profileRoute from './routes/profileRoute'
import profilesRoute from './routes/profilesRoute'

const PORT = process.env.PORT || 3000

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.use('/user', userRoute)
app.use('/profile', profileRoute)
app.use('/profiles', profilesRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
