import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersTasksService } from './users-tasks.service';
import { CreateUsersTaskDto } from './dto/create-users-task.dto';
import { UpdateUsersTaskDto } from './dto/update-users-task.dto';

@Controller('users-tasks')
export class UsersTasksController {
  constructor(private readonly usersTasksService: UsersTasksService) {}

  @Post()
  create(@Body() createUsersTaskDto: CreateUsersTaskDto) {
    return this.usersTasksService.create(createUsersTaskDto);
  }

  @Get()
  findAll() {
    return this.usersTasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersTasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersTaskDto: UpdateUsersTaskDto) {
    return this.usersTasksService.update(+id, updateUsersTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersTasksService.remove(+id);
  }
}
