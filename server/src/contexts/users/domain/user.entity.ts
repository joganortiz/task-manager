import { ConfirmedType } from '../infrastructure/sql/user.entity';
import {
  UserConfirmed,
  UserEmail,
  UserId,
  UserLastName,
  UserName,
  UserPassword,
} from './value-objects';

export class User {
  readonly _id: UserId;
  readonly name: UserName;
  readonly lastName: UserLastName;
  readonly email: UserEmail;
  readonly password: UserPassword;
  readonly confirmed?: UserConfirmed;

  constructor({
    _id,
    name,
    lastName,
    email,
    password,
    confirmed,
  }: {
    _id: UserId;
    name: UserName;
    lastName: UserLastName;
    email: UserEmail;
    password: UserPassword;
    confirmed?: UserConfirmed;
  }) {
    this._id = _id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.confirmed = confirmed;
  }

  static create(
    _id: UserId,
    name: UserName,
    lastName: UserLastName,
    email: UserEmail,
    password: UserPassword,
    confirmed?: UserConfirmed,
  ): User {
    return new User({
      _id,
      name,
      lastName,
      email: email,
      password: password,
      confirmed,
    });
  }

  static fromPrimitives(plainData: {
    _id: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    confirmed?: ConfirmedType;
  }): User {
    return new User({
      _id: new UserId(plainData._id),
      name: new UserName(plainData.name),
      lastName: new UserLastName(plainData.lastName),
      email: new UserEmail(plainData.email),
      password: new UserPassword(plainData.password),
      confirmed: new UserConfirmed(plainData.confirmed),
    });
  }

  toPrimitives(): {
    _id: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
  } {
    return {
      _id: this._id._value,
      name: this.name._value,
      lastName: this.lastName._value,
      email: this.email._value,
      password: this.password._value,
    };
  }
}
