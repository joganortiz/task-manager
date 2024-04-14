import { User } from './user.entity';
import { UserId } from './value-objects';

export interface UserRepository {
  create: (user: User) => Promise<User>;
  findAll: () => Promise<User[]>;
  findOne: (_id: UserId) => Promise<User | null>;
  update: (id: UserId, user: User) => Promise<User>;
  remove: (id: number) => Promise<User>;
  findBy: ({
    key,
    value,
    _id,
  }: {
    key: keyof User;
    value: any;
    _id?: UserId;
  }) => Promise<User | null>;
}
