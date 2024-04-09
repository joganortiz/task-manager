import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersTaskDto } from './create-users-task.dto';

export class UpdateUsersTaskDto extends PartialType(CreateUsersTaskDto) {}
