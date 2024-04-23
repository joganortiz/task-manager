import { BadRequestException } from '@nestjs/common';
import { Project } from 'src/contexts/projects/domain/project.entity';
import { ProjectRepository } from 'src/contexts/projects/domain/projectRepository';
import { ProjectId } from 'src/contexts/projects/domain/value-object';

export class ProjectFindOneUseCase {
  constructor(private readonly _projectRepository: ProjectRepository) {}
  async run(_id: string) {
    const projectId = new ProjectId(_id);

    const project: Project | null =
      await this._projectRepository.findOne(projectId);

    if (project === null) throw new BadRequestException('Project not found');

    return project.toPrimitives();
  }
}
