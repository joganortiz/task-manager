import { Injectable } from '@nestjs/common';
import { CreateTokenUserDto } from './dto/create-token-user.dto';
import { UpdateTokenUserDto } from './dto/update-token-user.dto';

@Injectable()
export class TokenUsersService {
  create(createTokenUserDto: CreateTokenUserDto) {
    return 'This action adds a new tokenUser';
  }

  findAll() {
    return `This action returns all tokenUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tokenUser`;
  }

  update(id: number, updateTokenUserDto: UpdateTokenUserDto) {
    return `This action updates a #${id} tokenUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} tokenUser`;
  }
}
