import { BadRequestException } from '@nestjs/common';
import { Project } from 'src/contexts/projects/domain/project.entity';
import { ProjectRepository } from 'src/contexts/projects/domain/projectRepository';
import { ProjectFindOne } from 'src/contexts/projects/domain/services';
import {
  ProjectClienteName,
  ProjectDescription,
  ProjectName,
} from 'src/contexts/projects/domain/value-object';
import { UpdateProjectDto } from 'src/contexts/projects/infrastructure/http/dto';

export class ProjectUpdateUseCase {
  private readonly _projectFindOne: ProjectFindOne;
  constructor(private readonly _projectRepository: ProjectRepository) {
    this._projectFindOne = new ProjectFindOne(this._projectRepository);
  }
  async run(_id: string, updateProjectDto: UpdateProjectDto) {
    if (Object.entries(updateProjectDto).length === 0)
      throw new BadRequestException('No data to update');

    const project = await this._projectFindOne.run(_id);

    const projectUpdate = Project.create(
      project._id,
      new ProjectName(updateProjectDto.name ?? project.name._value),
      new ProjectClienteName(
        updateProjectDto.client_name ?? project.clientName._value,
      ),
      new ProjectDescription(
        updateProjectDto.description ?? project.description._value,
      ),
      project.manager,
    );

    const projectUpdated = await this._projectRepository.update(
      project._id,
      projectUpdate,
    );
    return projectUpdated.toPrimitives();
  }
}
