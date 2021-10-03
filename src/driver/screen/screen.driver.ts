import { Router } from 'express'
import Screenshot from 'desktop-screenshot'
import cuid from 'cuid'

const screenDriver = Router()
screenDriver.get('/', (req, res) => {
  const fileName = `/tmp/${cuid()}.jpg`
  console.log('Screen Driver handler')

  Screenshot(fileName, { width: 1920, height: 1080, quality: 10 }, (err, complete) => {
    console.log('Screenshot,', fileName, err)

    if (complete) {
      res.setHeader('content-type', 'image/png'), console.log('sending file, ', fileName)
      res.sendFile(
        fileName,
        {
          root: process.cwd()
        },
        (err) => {
          console.log('sendFile', err)
        }
      )
    }

    if (err) {
      res.send(err)
    }
  })
})

export default screenDriver
