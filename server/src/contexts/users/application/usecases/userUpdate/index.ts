import { User } from 'src/contexts/users/domain/entities/user.entity';
import { UserRepository } from 'src/contexts/users/domain/userRepository';
import { UpdateUserDto } from 'src/contexts/users/infrastructure/http/dto';

export class UserUpdateUseCase {
  constructor(private readonly _userRepository: UserRepository) {}

  async run(id: number, updateUserDto: UpdateUserDto) {
    const userEntity = new User({
      id: updateUserDto?.id,
      name: updateUserDto?.name,
    });
    return await this._userRepository.update(id, userEntity);
  }
}
