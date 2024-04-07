import { UserRepository } from 'src/contexts/users/domain/userRepository';

export class UserFindOneUseCase {
  constructor(private readonly _userRepository: UserRepository) {}

  async run(id: number) {
    return await this._userRepository.findOne(id);
  }
}
