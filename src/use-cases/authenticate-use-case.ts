import { IUsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { compare } from 'bcryptjs'

interface IAuthenticateUseCaseRequest {
  email: string
  password: string
}
interface IAuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: IUsersRepository) {}
  async execute({
    email,
    password,
  }: IAuthenticateUseCaseRequest): Promise<IAuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findbyEmail(email)

    if (user?.last_date_acess) {
      user.last_date_acess = new Date()
    }

    if (!user) {
      throw new Error()
    }
    const doesPasswordMatches = await compare(password, user.password_hash)
    if (!doesPasswordMatches) {
      throw new Error()
    }

    return {
      user,
    }
  }
}
