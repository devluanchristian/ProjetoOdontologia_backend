import { FastifyInstance } from 'fastify'
import { register } from './controllers/register.controller'
import { authenticate } from './controllers/authenticate.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/signup', register)
  app.post('/signin', authenticate)
}
