export class Project {
  readonly _id: string;
  readonly name: string;
  readonly clientName: string;
  readonly description: string;
  readonly manager: string;

  constructor({
    _id,
    name,
    clientName,
    description,
    manager,
  }: {
    _id: string;
    name: string;
    clientName: string;
    description: string;
    manager: string;
  }) {
    this._id = _id;
    this.name = name;
    this.clientName = clientName;
    this.description = description;
    this.manager = manager;
  }
}
