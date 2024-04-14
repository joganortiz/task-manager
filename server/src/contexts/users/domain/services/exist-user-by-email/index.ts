import { User } from '../../user.entity';
import { UserRepository } from '../../userRepository';
import { UserEmail } from '../../value-objects';

export class ExistUserByEmail {
  constructor(private readonly _userRepository: UserRepository) {}

  async run(email: string): Promise<boolean> {
    const prepareEmail: UserEmail = new UserEmail(email);

    const user: User | null = await this._userRepository.findBy({
      key: 'email',
      value: prepareEmail._value,
    });

    if (user !== null) return true;

    return false;
  }
}
