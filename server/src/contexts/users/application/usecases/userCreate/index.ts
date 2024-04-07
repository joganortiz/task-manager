import { User } from 'src/contexts/users/domain/entities/user.entity';
import { UserRepository } from 'src/contexts/users/domain/userRepository';
import { CreateUserDto } from 'src/contexts/users/infrastructure/http/dto';

export class UserCreateUseCase {
  constructor(private readonly _userRepository: UserRepository) {}

  async run(createUserDto: CreateUserDto) {
    const userEntity = new User({
      id: createUserDto?.id,
      name: createUserDto?.name,
    });
    return await this._userRepository.create(userEntity);
  }
}
