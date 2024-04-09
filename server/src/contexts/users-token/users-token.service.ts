import { Injectable } from '@nestjs/common';
import { CreateUsersTokenDto } from './dto/create-users-token.dto';
import { UpdateUsersTokenDto } from './dto/update-users-token.dto';

@Injectable()
export class UsersTokenService {
  create(createUsersTokenDto: CreateUsersTokenDto) {
    return 'This action adds a new usersToken';
  }

  findAll() {
    return `This action returns all usersToken`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersToken`;
  }

  update(id: number, updateUsersTokenDto: UpdateUsersTokenDto) {
    return `This action updates a #${id} usersToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersToken`;
  }
}
