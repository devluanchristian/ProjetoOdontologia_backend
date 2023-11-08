import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AlreadyExist } from '@/use-cases/error/alreadyExists'
import { RegisterUseCase } from '@/use-cases/register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    ra: z.string().min(8),
  })

  const { name, email, password, ra } = registerBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)
    const { user } = await registerUseCase.execute({
      name,
      email,
      password,
      ra,
    })
    reply.status(201).send(user)
  } catch (error) {
    if (error instanceof AlreadyExist) {
      return reply.status(400).send({ message: error.message })
    }
    reply.status(500).send({ error })
  }
}
