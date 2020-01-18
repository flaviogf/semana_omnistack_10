import 'dotenv/config'

import http from 'http'
import express from 'express'
import socketio from 'socket.io'
import mongoose from 'mongoose'
import cors from 'cors'
import routes from './routes'
import databaseConfig from './config/database'

const app = express()
const server = http.Server(app)
const io = socketio(server)

const connections = []

io.on('connection', (socket) => {
  console.log(`${socket.id} has been connected`)

  const { latitude, longitude, techs } = socket.handshake.query

  const connection = {
    id: socket.id,
    coordinates: { latitude: Number(latitude), longitude: Number(longitude) },
    techs: techs.split(',').map((it) => it.trim()),
  }

  console.log(connection)

  connections.push(connection)
})

mongoose.connect(databaseConfig.url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

app.use((req, res, next) => {
  req.io = io
  req.connections = connections
  next()
})

app.use(cors())

app.use(express.json())

app.use(routes)

server.listen(3333, () => console.log('Application is running on port 3333'))
