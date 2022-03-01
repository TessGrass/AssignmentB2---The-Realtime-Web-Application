/**
 * The main script file of the application.
 *
 * @author Therese Grass <tg222kv@student.lnu.se>
 */

import express from 'express'
import { router } from './routes/router.js'
import expressLayouts from 'express-ejs-layouts'
import logger from 'morgan'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import helmet from 'helmet'
// import cors from 'cors'
const app = express()
const directoryFullName = dirname(fileURLToPath(import.meta.url)) // Search path from C:/ to src.
const baseURL = process.env.BASE_URL || '/'

try {
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'gitlab.lnu.se'],
      imgSrc: ['gitlab.lnu.se', 'secure.gravatar.com']
    }
  }))


  app.use(logger('dev'))
  app.set('view engine', 'ejs')
  app.set('views', 'src/views/')
  app.use(expressLayouts)
  app.set('layout', join(directoryFullName, 'views', 'layouts', 'default'))
  app.use(express.urlencoded({ extended: false })) // if removed, you can't add products. Handles form data
  app.use(express.static(join(directoryFullName, '..', 'public')))

  if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
  }
  app.use(express.json())

  const httpServer = createServer(app)
  const io = new Server(httpServer)

  io.on('connect_error', (err) => {
    console.log(`connect_error due to ${err.message}`)
  })
  io.on('connection', (socket) => {
    console.log('socket.io: a user connected')

    socket.on('disconnect', () => {
      console.log('socket.io: a user disconnected')
    })
  })

  // Pass the base URL.
  app.use((req, res, next) => {
    res.locals.baseURL = baseURL
    res.io = io
    next()
  })

  app.use('/', router)

  app.use(function (err, req, res, next) {
    if (req.originalUrl.includes('/webhooks')) { // it is enough to send a message to gitlab, do not need to render a view.
      return res
        .status(err.status || 500)
        .end(err.message)
    }
    if (err.status === 404) {
      return res.status(404).render(join(directoryFullName, 'views', 'errors', '404.ejs'))
    } else if (err.status === 403) {
      return res.status(403).render(join(directoryFullName, 'views', 'errors', '403.ejs'))
    } else if (err.status === 500) {
      return res.status(500).render(join(directoryFullName, 'views', 'errors', '500.ejs'))
    }
  })
  httpServer.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate..')
  })
} catch (err) {
  console.error(err)
  process.exitCode = 1
}
