import { User } from './entities/user.entity';

export interface UserRepository {
  create: (user: User) => Promise<User>;
  findAll: () => Promise<User[]>;
  findOne: (id: number) => Promise<User | null>;
  update: (id: number, user: User) => Promise<User>;
  remove: (id: number) => Promise<User>;
}
