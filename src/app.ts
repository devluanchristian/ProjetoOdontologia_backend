import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { appRoutes } from './http/routes'
import { authenticateGoogle } from './http/googleAuth'
import fastifyJwt from '@fastify/jwt'

// Crie uma instância do Fastify
export const app = fastify()

// Registre as rotas do seu aplicativo

app.register(appRoutes)
app.register(authenticateGoogle)
app.register(fastifyJwt, {
  secret: 'projetoodonto',
})

// Lidere com erros de validação Zod
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.issues,
    })
  }
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // Trate os erros de produção aqui
  }
  return reply.status(500).send({ message: 'Internal server error' })
})
