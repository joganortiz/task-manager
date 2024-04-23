import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { InMysqlProjectRepository } from '../../implementations';
import { InMysqlUserRepository } from 'src/contexts/users/infrastructure/implementations/InMysqlUserRepository';
import { uuid } from 'src/plugins/uuid';
import {
  ProjectCreateUseCase,
  ProjectFindAllUseCase,
  ProjectFindOneUseCase,
  ProjectRemoveUseCase,
  ProjectUpdateUseCase,
} from 'src/contexts/projects/application/use-cases';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly _inMysqlProjectRepository: InMysqlProjectRepository,
    private readonly _inMysqlUserRepository: InMysqlUserRepository,
  ) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return new ProjectCreateUseCase(
      this._inMysqlProjectRepository,
      this._inMysqlUserRepository,
      uuid,
    ).run(createProjectDto);
  }

  @Get()
  findAll() {
    return new ProjectFindAllUseCase().run();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return new ProjectFindOneUseCase().run(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return new ProjectUpdateUseCase().run(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return new ProjectRemoveUseCase().run(id);
  }
}
