import { Router } from 'express'
import DevController from './controllers/DevController'

const routes = Router()

routes.post('/user', DevController.store)
routes.get('/user', DevController.index)

export default routes
