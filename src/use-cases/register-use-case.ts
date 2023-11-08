import { IUsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { AlreadyExist } from './error/alreadyExists'

interface IRegisterUseCaseRequest {
  name: string
  email: string
  ra: string
  password: string
}

interface IRegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    ra,
    password,
  }: IRegisterUseCaseRequest): Promise<IRegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const emailAlreadyExist = await this.usersRepository.findbyEmail(email)
    if (emailAlreadyExist) {
      throw new AlreadyExist()
    }
    const user = await this.usersRepository.create({
      name,
      email,
      ra,
      password_hash,
    })
    return { user }
  }
}
