import { User } from 'src/contexts/users/domain/user.entity';
import {
  ProjectClienteName,
  ProjectDescription,
  ProjectId,
  ProjectName,
} from './value-object';

export class Project {
  readonly _id: ProjectId;
  readonly name: ProjectName;
  readonly clientName: ProjectClienteName;
  readonly description: ProjectDescription;
  readonly manager: User;

  constructor({
    _id,
    name,
    clientName,
    description,
    manager,
  }: {
    _id: ProjectId;
    name: ProjectName;
    clientName: ProjectClienteName;
    description: ProjectDescription;
    manager: User;
  }) {
    this._id = _id;
    this.name = name;
    this.clientName = clientName;
    this.description = description;
    this.manager = manager;
  }

  toPrimitives() {
    return {
      _id: this._id._value,
      name: this.name._value,
      clientName: this.clientName._value,
      description: this.description._value,
      manager: this.manager.toPrimitives(),
    };
  }
}
