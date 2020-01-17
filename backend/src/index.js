import 'dotenv/config'

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import routes from './routes'
import databaseConfig from './config/database'

const app = express()

mongoose.connect(databaseConfig.url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

app.use(cors())

app.use(express.json())

app.use(routes)

app.listen(3333, () => console.log('Application is running on port 3333'))
