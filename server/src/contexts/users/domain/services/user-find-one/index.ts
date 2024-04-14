import { BadRequestException } from '@nestjs/common';
import { User } from '../../user.entity';
import { UserRepository } from '../../userRepository';
import { UserId } from '../../value-objects';

export class UserFindOne {
  constructor(private readonly _userRepository: UserRepository) {}

  async run(id: string): Promise<User> {
    const userId = new UserId(id);

    const user = await this._userRepository.findOne(userId);

    if (!user) throw new BadRequestException('User not found');

    return user;
  }
}
