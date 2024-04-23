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
    return new ProjectFindAllUseCase(this._inMysqlProjectRepository).run();
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
    return new ProjectFindOneUseCase(this._inMysqlProjectRepository).run(id);
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
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return new ProjectUpdateUseCase(this._inMysqlProjectRepository).run(
      id,
      updateProjectDto,
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
    return new ProjectRemoveUseCase(this._inMysqlProjectRepository).run(id);
  }
}
