import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate-use-case'
import { hash } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    authenticateUseCase = new AuthenticateUseCase(usersRepository)
    await usersRepository.create({
      email: 'luan@gmail.com',
      name: 'luan',
      password_hash: await hash('123456', 6),
    })
  })
  it('should be able to authenticate user', async () => {
    const { user } = await authenticateUseCase.execute({
      email: 'luan@gmail.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })
  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      authenticateUseCase.execute({
        email: 'prisma@prisma.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
