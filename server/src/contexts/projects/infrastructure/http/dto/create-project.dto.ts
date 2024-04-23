import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Client name is required' })
  @IsString({ message: 'Client name must be a string' })
  client_name: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsNotEmpty({ message: 'Manager is required' })
  @IsUUID('all', { message: 'Manager must be a valid UUID' })
  manager: string;
}
