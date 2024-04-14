import { ConfirmedType } from '../../infrastructure/sql/user.entity';

export class UserConfirmed {
  readonly _value: ConfirmedType;

  constructor(value: ConfirmedType) {
    this._value = value;
  }
}
