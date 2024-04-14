import { UserRepository } from 'src/contexts/users/domain/userRepository';

export class UserRemoveUseCase {
  constructor(private readonly _userRepository: UserRepository) {}

  async run(id: number) {
    return this._userRepository.remove(id);
  }
}
