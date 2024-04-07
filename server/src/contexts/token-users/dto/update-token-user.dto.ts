import { PartialType } from '@nestjs/mapped-types';
import { CreateTokenUserDto } from './create-token-user.dto';

export class UpdateTokenUserDto extends PartialType(CreateTokenUserDto) {}
