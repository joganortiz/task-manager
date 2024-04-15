import { Project } from 'src/contexts/project/domain/project.entity';
import { ProjectRepository } from 'src/contexts/project/domain/projectRepository';
import {
  ProjectDescription,
  ProjectId,
  ProjectName,
} from 'src/contexts/project/domain/value-object';
import { CreateProjectDto } from 'src/contexts/project/infrastructure/http/dto';
import { UserFindOne } from 'src/contexts/users/domain/services/user-find-one';
import { User } from 'src/contexts/users/domain/user.entity';
import { UserRepository } from 'src/contexts/users/domain/userRepository';
import { UUID } from 'src/plugins/uuid';

export class ProjectCreateUseCase {
  private readonly _userFindOne: UserFindOne;
  constructor(
    private readonly _projectRepository: ProjectRepository,
    private readonly _userRepository: UserRepository,
    private readonly _uuid: UUID,
  ) {
    this._userFindOne = new UserFindOne(this._userRepository);
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

    const projectCreator = await this._projectRepository.create(createProject);
    return projectCreator.toPrimitives();
  }
}
