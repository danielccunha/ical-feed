import { Router } from 'express'

import EventsController from '@controllers/EventsController'

const routes = Router()
const controller = new EventsController()

routes.post('/', controller.create)

export default routes
