import { BadRequestException } from '@nestjs/common';
import { ExistUserByEmail } from 'src/contexts/users/domain/services';
import { User } from 'src/contexts/users/domain/user.entity';
import { UserRepository } from 'src/contexts/users/domain/userRepository';
import {
  UserEmail,
  UserId,
  UserLastName,
  UserName,
  UserPassword,
} from 'src/contexts/users/domain/value-objects';
import { CreateUserDto } from 'src/contexts/users/infrastructure/http/dto';
import { UUID } from 'src/plugins/uuid';

export class UserCreateUseCase {
  private readonly _existUserByEmail: ExistUserByEmail;

  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _uuid: UUID,
  ) {
    this._existUserByEmail = new ExistUserByEmail(this._userRepository);
  }

  async run(createUserDto: CreateUserDto) {
    const createUser = new User({
      _id: new UserId(await this._uuid.generate()),
      name: new UserName(createUserDto.name),
      lastName: new UserLastName(createUserDto.last_name),
      email: new UserEmail(createUserDto.email),
      password: new UserPassword(createUserDto.password),
    });

    // validate exist user by email
    const existeUserByEmail = await this._existUserByEmail.run(
      createUser.email._value,
    );

    if (existeUserByEmail)
      throw new BadRequestException('The user with this email already exists');

    const userCreator = await this._userRepository.create(createUser);
    return userCreator.toPrimitives();
  }
}
