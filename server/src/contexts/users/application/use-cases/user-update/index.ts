import { BadRequestException } from '@nestjs/common';
import { ExistUserByEmail } from 'src/contexts/users/domain/services';
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
  private readonly _existUserByEmail: ExistUserByEmail;

  constructor(private readonly _userRepository: UserRepository) {
    this._userFindOne = new UserFindOne(this._userRepository);
    this._existUserByEmail = new ExistUserByEmail(this._userRepository);
  }

  async run(_id: string, updateUserDto: UpdateUserDto) {
    if (Object.entries(updateUserDto).length === 0)
      throw new BadRequestException('No data to update');

    const user: User = await this._userFindOne.run(_id);

    const userUpdate = User.create(
      user._id,
      new UserName(updateUserDto.name ?? user.name._value),
      new UserLastName(updateUserDto.last_name ?? user.lastName._value),
      new UserEmail(updateUserDto.email ?? user.email._value),
      new UserPassword(updateUserDto.password ?? user.password._value),
      new UserConfirmed(updateUserDto?.confirmed ?? user.confirmed._value),
    );

    // validate exist user by email
    const existeUserByEmail = await this._existUserByEmail.run(
      userUpdate.email._value,
      user._id._value,
    );

    if (existeUserByEmail)
      throw new BadRequestException('The user with this email already exists');

    const userUpdated = await this._userRepository.update(user._id, userUpdate);

    return userUpdated.toPrimitives();
  }
}
