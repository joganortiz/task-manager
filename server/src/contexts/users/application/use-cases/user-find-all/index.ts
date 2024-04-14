import { User } from 'src/contexts/users/domain/user.entity';
import { UserRepository } from 'src/contexts/users/domain/userRepository';

export class UserFindAllUseCase {
  constructor(private readonly _userRepository: UserRepository) {}

  async run() {
    const users: User[] = await this._userRepository.findAll();

    return users.map((user) => user.toPrimitives());
  }
}
