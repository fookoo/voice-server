import WebSocket, { WebSocketServer } from 'ws'
import express from 'express'

import cors from 'cors'
import screenDriver from './driver/screen/screen.driver'

const app = express()

const port = 8080
const wsPort = 8081

const wss = new WebSocketServer({
  port: wsPort
  // perMessageDeflate: {
  //   zlibDeflateOptions: {
  //     chunkSize: 1024,
  //     memLevel: 7,
  //     level: 3
  //   },
  //   zlibInflateOptions: {
  //     chunkSize: 10 * 1024
  //   },
  //   clientNoContextTakeover: true,
  //   serverNoContextTakeover: true,
  //   serverMaxWindowBits: 10,
  //   concurrencyLimit: 10,
  //   threshold: 1024
  // }
})

app.use(cors())
app.use('/screen', screenDriver)
app.get('/health', (req, res) => {
  res.json({
    status: 'alive'
  })
})

app.listen(port, () => {
  console.log(`VoiceCommander server started at http://localhost:${port}`)
})

const onMessage = (message: WebSocket.MessageEvent) => {
  console.log('> %s', message)
}

wss.on('error', console.log)
wss.on('listening', () => {
  console.log('list')
})
wss.on('connection', (connection) => {
  console.log('WS Connection')
  connection.on('message', onMessage)
  connection.send('Welcome to the WS Server')
})
