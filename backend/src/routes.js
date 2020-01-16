import { Router } from 'express'
import DevController from './controllers/DevController'
import SearchController from './controllers/SearchController'

const routes = Router()

routes.post('/user', DevController.store)
routes.get('/user', DevController.index)
routes.get('/search', SearchController.index)

export default routes
