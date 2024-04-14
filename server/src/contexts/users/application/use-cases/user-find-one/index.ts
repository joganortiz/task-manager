import { BadRequestException } from '@nestjs/common';
import { User } from 'src/contexts/users/domain/user.entity';
import { UserRepository } from 'src/contexts/users/domain/userRepository';
import { UserId } from 'src/contexts/users/domain/value-objects';

export class UserFindOneUseCase {
  constructor(private readonly _userRepository: UserRepository) {}

  async run(_id: string) {
    const userId = new UserId(_id);
    const user: User | null = await this._userRepository.findOne(userId);

    if (user === null) throw new BadRequestException('User not found');

    return user.toPrimitives();
  }
}
