import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/userRepository';

export class InMysqlUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    console.log('llego a crear usuario');
    return user;
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  async findOne(id: number): Promise<User | null> {
    console.log('llego a buscar usuario', id);
    return null;
  }

  async update(id: number, user: User): Promise<User> {
    console.log('llego a actualizar usuario', id);
    return user;
  }

  async remove(id: number): Promise<User> {
    console.log('llego a borrar usuario', id);
    return {} as User;
  }
}
