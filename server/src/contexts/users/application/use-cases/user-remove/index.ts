import { UserFindOne } from 'src/contexts/users/domain/services/user-find-one';
import { User } from 'src/contexts/users/domain/user.entity';
import { UserRepository } from 'src/contexts/users/domain/userRepository';

export class UserRemoveUseCase {
  private readonly _userFindOne: UserFindOne;
  constructor(private readonly _userRepository: UserRepository) {
    this._userFindOne = new UserFindOne(this._userRepository);
  }

  async run(_id: string) {
    const user: User = await this._userFindOne.run(_id);

    await this._userRepository.remove(user._id);
    const userDelete = User.fromPrimitives(user.toPrimitives());

    return userDelete.toPrimitives();
  }
}
