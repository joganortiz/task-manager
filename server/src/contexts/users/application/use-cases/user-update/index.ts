import { UserFindOne } from 'src/contexts/users/domain/services/user-find-one';
import { User } from 'src/contexts/users/domain/user.entity';
import { UserRepository } from 'src/contexts/users/domain/userRepository';
import {
  UserConfirmed,
  UserEmail,
  UserLastName,
  UserName,
  UserPassword,
} from 'src/contexts/users/domain/value-objects';
import { UpdateUserDto } from 'src/contexts/users/infrastructure/http/dto';

export class UserUpdateUseCase {
  private readonly _userFindOne: UserFindOne;
  constructor(private readonly _userRepository: UserRepository) {
    this._userFindOne = new UserFindOne(this._userRepository);
  }

  async run(_id: string, updateUserDto: UpdateUserDto) {
    const user: User = await this._userFindOne.run(_id);

    const userUpdate = User.create(
      user._id,
      new UserName(updateUserDto.name ?? user.name._value),
      new UserLastName(updateUserDto.last_name ?? user.lastName._value),
      new UserEmail(updateUserDto.email ?? user.email._value),
      new UserPassword(updateUserDto.password ?? user.password._value),
      new UserConfirmed(updateUserDto?.confirmed ?? user.confirmed._value),
    );
    console.log('update user', user, updateUserDto);

    return await this._userRepository.update(user._id, userUpdate);
  }
}
