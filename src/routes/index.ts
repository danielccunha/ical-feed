import { Router } from 'express'

import usersRouter from './users.routes'
import eventsRouter from './events.routes'

const routes = Router()
routes.use('/users', usersRouter)
routes.use('/events', eventsRouter)

export default routes
