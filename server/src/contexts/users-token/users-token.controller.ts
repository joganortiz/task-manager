import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersTokenService } from './users-token.service';
import { CreateUsersTokenDto } from './dto/create-users-token.dto';
import { UpdateUsersTokenDto } from './dto/update-users-token.dto';

@Controller('users-token')
export class UsersTokenController {
  constructor(private readonly usersTokenService: UsersTokenService) {}

  @Post()
  create(@Body() createUsersTokenDto: CreateUsersTokenDto) {
    return this.usersTokenService.create(createUsersTokenDto);
  }

  @Get()
  findAll() {
    return this.usersTokenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersTokenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersTokenDto: UpdateUsersTokenDto) {
    return this.usersTokenService.update(+id, updateUsersTokenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersTokenService.remove(+id);
  }
}
