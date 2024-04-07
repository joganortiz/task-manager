import { UserRepository } from 'src/contexts/users/domain/userRepository';

export class UserFindAllUseCase {
  constructor(private readonly _userRepository: UserRepository) {}

  async run() {
    return await this._userRepository.findAll();
  }
}
