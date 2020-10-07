import 'dotenv/config'

import path from 'path'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import 'express-async-errors'

import '@config/mongo'
import '@config/ical'

import routes from './routes'

class App {
  public express: express.Application

  constructor() {
    this.express = express()

    this.middleware()
    this.routes()
  }

  middleware() {
    this.express.use(morgan('dev'))
    this.express.use(helmet())
    this.express.use(cors())
    this.express.use(express.json())
  }

  routes() {
    this.express.use(routes)
    this.express.use(
      '/public',
      express.static(path.resolve(__dirname, '..', 'public'))
    )
  }
}

export default new App().express
