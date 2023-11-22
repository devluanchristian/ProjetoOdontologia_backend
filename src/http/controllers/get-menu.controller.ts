import { PrismaMenuRepository } from '@/repositories/prisma/prisma-menu-repositoy'
import { GetMenuUseCase } from '@/use-cases/get-menu-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function getMenu(request: FastifyRequest, reply: FastifyReply) {
  const getPetSchema = z.object({
    menuId: z.number(),
  })

  const { menuId } = getPetSchema.parse(request.params)

  try {
    const menuRepository = new PrismaMenuRepository()
    const getMenuUseCase = new GetMenuUseCase(menuRepository)

    const { menu } = await getMenuUseCase.execute({
      menuId,
    })

    return reply.status(200).send(menu)
  } catch (error) {
    if (error) {
      return reply.status(409).send(error)
    }
    throw error
  }
}
