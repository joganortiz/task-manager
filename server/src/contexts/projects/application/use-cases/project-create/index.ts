import { BadRequestException } from '@nestjs/common';
import { Project } from 'src/contexts/projects/domain/project.entity';
import { ProjectRepository } from 'src/contexts/projects/domain/projectRepository';
import { ExistProjectFindBy } from 'src/contexts/projects/domain/services';
import {
  ProjectDescription,
  ProjectId,
  ProjectName,
} from 'src/contexts/projects/domain/value-object';
import { CreateProjectDto } from 'src/contexts/projects/infrastructure/http/dto';
import { UserFindOne } from 'src/contexts/users/domain/services/user-find-one';
import { User } from 'src/contexts/users/domain/user.entity';
import { UserRepository } from 'src/contexts/users/domain/userRepository';
import { UUID } from 'src/plugins/uuid';

export class ProjectCreateUseCase {
  private readonly _userFindOne: UserFindOne;
  private readonly _existProjectFindBy: ExistProjectFindBy;
  constructor(
    private readonly _projectRepository: ProjectRepository,
    private readonly _userRepository: UserRepository,
    private readonly _uuid: UUID,
  ) {
    this._userFindOne = new UserFindOne(this._userRepository);
    this._existProjectFindBy = new ExistProjectFindBy(this._projectRepository);
  }

  async run(createProjectDto: CreateProjectDto) {
    // validate exist user
    const user: User = await this._userFindOne.run(createProjectDto.manager);

    const createProject = new Project({
      _id: new ProjectId(await this._uuid.generate()),
      name: new ProjectName(createProjectDto.name),
      description: new ProjectDescription(createProjectDto.description),
      clientName: new ProjectName(createProjectDto.client_name),
      manager: user,
    });

    // valida exist project
    const existProject = await this._existProjectFindBy.run(
      [
        { key: 'name', value: createProject.name._value },
        { key: 'clientName', value: createProject.clientName._value },
      ],
      createProject._id._value,
    );

    if (existProject != false)
      throw new BadRequestException(
        'Project already exists with this name and client name',
      );

    const projectCreator = await this._projectRepository.create(createProject);
    return projectCreator.toPrimitives();
  }
}
