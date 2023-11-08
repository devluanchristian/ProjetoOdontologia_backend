export class AlreadyExist extends Error {
  constructor() {
    super('E-mail já existe ')
  }
}
