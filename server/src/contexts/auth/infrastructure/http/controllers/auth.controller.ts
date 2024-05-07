import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../../../auth.service';
import { LoginAuthDto } from '../dto/login-auth.dto';
import { UpdateAuthDto } from '../dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginAuthDto: LoginAuthDto) {
    return loginAuthDto; //this.authService.create(createAuthDto);
  }

  @Post('/register')
  register(@Body() loginAuthDto: LoginAuthDto) {
    return loginAuthDto;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }
}
