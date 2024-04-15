import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ConfirmedType } from '../../sql/user.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  confirmed?: ConfirmedType;
}
