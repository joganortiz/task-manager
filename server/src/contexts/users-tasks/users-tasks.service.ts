import { Injectable } from '@nestjs/common';
import { CreateUsersTaskDto } from './dto/create-users-task.dto';
import { UpdateUsersTaskDto } from './dto/update-users-task.dto';

@Injectable()
export class UsersTasksService {
  create(createUsersTaskDto: CreateUsersTaskDto) {
    return 'This action adds a new usersTask';
  }

  findAll() {
    return `This action returns all usersTasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersTask`;
  }

  update(id: number, updateUsersTaskDto: UpdateUsersTaskDto) {
    return `This action updates a #${id} usersTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersTask`;
  }
}
