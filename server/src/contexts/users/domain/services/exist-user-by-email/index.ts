import { User } from '../../user.entity';
import { UserRepository } from '../../userRepository';
import { UserEmail, UserId } from '../../value-objects';

export class ExistUserByEmail {
  constructor(private readonly _userRepository: UserRepository) {}

  async run(email: string, _id?: string): Promise<boolean> {
    const prepareEmail: UserEmail = new UserEmail(email);
    const prepareId: UserId | undefined = _id ? new UserId(_id) : undefined;

    const user: User | null = await this._userRepository.findBy({
      key: 'email',
      value: prepareEmail._value,
      _id: prepareId,
    });

    if (user !== null) return true;

    return false;
  }
}
