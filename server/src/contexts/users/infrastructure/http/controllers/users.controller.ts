import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  BadRequestException,
} from '@nestjs/common';
import {
  UserFindOneUseCase,
  UserCreateUseCase,
  UserFindAllUseCase,
  UserUpdateUseCase,
  UserRemoveUseCase,
} from '../../../application/use-cases';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { InMysqlUserRepository } from '../../implementations/InMysqlUserRepository';
import { uuid } from 'src/plugins/uuid';

@Controller('users')
export class UsersController {
  constructor(private readonly _inMysqlUserRepository: InMysqlUserRepository) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return new UserCreateUseCase(this._inMysqlUserRepository, uuid).run(
      createUserDto,
    );
  }

  @Get()
  findAll() {
    return new UserFindAllUseCase(this._inMysqlUserRepository).run();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () => new BadRequestException('User not found'),
      }),
    )
    id: string,
  ) {
    return new UserFindOneUseCase(this._inMysqlUserRepository).run(id);
  }

  @Patch(':id')
  update(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () => new BadRequestException('User not found'),
      }),
    )
    id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return new UserUpdateUseCase(this._inMysqlUserRepository).run(
      id,
      updateUserDto,
    );
  }

  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () => new BadRequestException('User not found'),
      }),
    )
    id: string,
  ) {
    return new UserRemoveUseCase(this._inMysqlUserRepository).run(id);
  }
}
