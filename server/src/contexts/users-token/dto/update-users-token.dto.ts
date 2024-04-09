import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersTokenDto } from './create-users-token.dto';

export class UpdateUsersTokenDto extends PartialType(CreateUsersTokenDto) {}
