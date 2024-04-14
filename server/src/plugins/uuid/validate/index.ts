import { validate } from 'uuid';

export const uuidValidate = (value: string): boolean => validate(value);
