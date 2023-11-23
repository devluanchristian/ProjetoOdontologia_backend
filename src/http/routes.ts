import { FastifyInstance } from 'fastify'
import { register } from './controllers/register.controller'
import { authenticate } from './controllers/authenticate.controller'
import { createMenu } from './controllers/menu.controller'
import { getMenu } from './controllers/get-menu.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/signup', register)
  app.post('/signin', authenticate)
  app.post('/menu', createMenu)
  app.get('/menu/:sub_MenuId', getMenu)
}
