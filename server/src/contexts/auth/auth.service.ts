import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './infrastructure/http/dto/login-auth.dto';
import { UpdateAuthDto } from './infrastructure/http/dto/update-auth.dto';

@Injectable()
export class AuthService {
  create(createAuthDto: LoginAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
