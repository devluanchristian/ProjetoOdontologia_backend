import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { RegisterUseCase } from './register-use-case'

let usersRepository: InMemoryUsersRepository
let registerUseCase: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    registerUseCase = new RegisterUseCase(usersRepository)
  })
  it('should to register users', async () => {
    const { user } = await registerUseCase.execute({
      name: 'Luan',
      email: 'luan@gmail.com',
      password: 'password',
    })
    expect(user.id).toEqual(expect.any(String))
  })
})
