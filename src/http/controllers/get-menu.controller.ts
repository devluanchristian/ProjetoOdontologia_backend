import { PrismaMenuRepository } from '@/repositories/prisma/prisma-menu-repositoy'
import { GetMenuUseCase } from '@/use-cases/get-menu-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function getMenu(request: FastifyRequest, reply: FastifyReply) {
  const getMenuSchema = z.object({
    sub_MenuId: z.string().refine((value) => !isNaN(Number(value)), {
      message: 'sub_MenuId must be a valid number string',
    }),
  })

  const { sub_MenuId } = getMenuSchema.parse(request.params)

  try {
    const menuRepository = new PrismaMenuRepository()
    const getMenuUseCase = new GetMenuUseCase(menuRepository)

    const { menu } = await getMenuUseCase.execute({
      sub_MenuId: Number(sub_MenuId), // Converter a string para número
    })

    return reply.status(200).send(menu)
  } catch (error) {
    return reply.status(400).send(error)
  }
}
