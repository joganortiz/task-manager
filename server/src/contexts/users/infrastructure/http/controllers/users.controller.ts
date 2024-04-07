import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  UserFindOneUseCase,
  UserCreateUseCase,
  UserFindAllUseCase,
  UserUpdateUseCase,
  UserRemoveUseCase,
} from '../../../application/usecases';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { InMysqlUserRepository } from '../../implementations/InMysqlUserRepository';

@Controller('users')
export class UsersController {
  constructor(private readonly _inMysqlUserRepository: InMysqlUserRepository) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return new UserCreateUseCase(this._inMysqlUserRepository).run(
      createUserDto,
    );
  }

  @Get()
  findAll() {
    return new UserFindAllUseCase(this._inMysqlUserRepository).run();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return new UserFindOneUseCase(this._inMysqlUserRepository).run(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return new UserUpdateUseCase(this._inMysqlUserRepository).run(
      +id,
      updateUserDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return new UserRemoveUseCase(this._inMysqlUserRepository).run(+id);
  }
}
