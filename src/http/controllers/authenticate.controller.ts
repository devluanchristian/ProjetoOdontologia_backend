import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate-use-case'
import { InvalidCredentials } from '@/use-cases/error/invalidCredentials'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)
    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })
    // // criando o token após a autenticação do usuario
    // const token = await reply.jwtSign(
    //   {},
    //   {
    //     sign: {
    //       sub: user.id,
    //     },
    //   },
    // )
    reply.status(200).send({ user })
  } catch (error) {
    if (error instanceof InvalidCredentials) {
      return reply.status(400).send({ message: error.message })
    }
  }
}
