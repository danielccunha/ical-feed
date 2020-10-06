import { Router } from 'express'

import UsersController from '@controllers/UsersController'

const routes = Router()
const controller = new UsersController()

routes.get('/', controller.index)
routes.post('/', controller.create)

export default routes
