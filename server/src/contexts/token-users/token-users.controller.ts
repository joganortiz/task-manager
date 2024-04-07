import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TokenUsersService } from './token-users.service';
import { CreateTokenUserDto } from './dto/create-token-user.dto';
import { UpdateTokenUserDto } from './dto/update-token-user.dto';

@Controller('token-users')
export class TokenUsersController {
  constructor(private readonly tokenUsersService: TokenUsersService) {}

  @Post()
  create(@Body() createTokenUserDto: CreateTokenUserDto) {
    return this.tokenUsersService.create(createTokenUserDto);
  }

  @Get()
  findAll() {
    return this.tokenUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tokenUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTokenUserDto: UpdateTokenUserDto) {
    return this.tokenUsersService.update(+id, updateTokenUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tokenUsersService.remove(+id);
  }
}
