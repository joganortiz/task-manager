import { uuidGenerate } from './generate';
import { uuidValidate } from './validate';

export type UUID = {
  validate: (value: string) => boolean;
  generate: () => Promise<string>;
};

export const uuid: UUID = {
  validate: uuidValidate,
  generate: uuidGenerate,
};
