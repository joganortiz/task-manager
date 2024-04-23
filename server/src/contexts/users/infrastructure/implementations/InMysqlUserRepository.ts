import { FindOptionsWhere, Not } from 'typeorm';
import { User } from '../../domain/user.entity';
import { UserRepository } from '../../domain/userRepository';
import { UserId } from '../../domain/value-objects';
import { UserEntity } from '../sql/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMysqlUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    const prepareUser = new UserEntity();
    prepareUser._id = user._id._value;
    prepareUser.name = user.name._value;
    prepareUser.lastName = user.lastName._value;
    prepareUser.email = user.email._value;
    prepareUser.password = user.password._value;
    await prepareUser.save();

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await UserEntity.find();
    return users.map((user) => User.fromPrimitives(user));
  }

  async findOne(_id: UserId): Promise<User | null> {
    const user = await UserEntity.findOne({
      where: { _id: _id._value },
    });

    if (user === null) return null;

    return User.fromPrimitives(user);
  }

  async update(id: UserId, user: User): Promise<User> {
    const prepareUpdate = new UserEntity();

    prepareUpdate.name = user.name._value;
    prepareUpdate.lastName = user.lastName._value;
    prepareUpdate.email = user.email._value;
    prepareUpdate.password = user.password._value;
    prepareUpdate.confirmed = user.confirmed._value;
    UserEntity.update({ _id: id._value }, prepareUpdate);

    return user;
  }

  async remove(id: UserId): Promise<void> {
    await UserEntity.delete({ _id: id._value });
  }

  async findBy({
    key,
    value,
    _id,
  }: {
    key: keyof User;
    value: any;
    _id?: UserId;
  }): Promise<User | null> {
    const where: FindOptionsWhere<UserEntity> | FindOptionsWhere<UserEntity>[] =
      { [key]: value };

    // validate exist _id
    if (_id != undefined) {
      where['_id'] = Not(_id._value);
    }

    // validate exist user
    const user = await UserEntity.findOne({
      where,
    });

    if (user === null) return null;

    return User.fromPrimitives(user);
  }
}
