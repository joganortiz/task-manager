import { BadRequestException } from '@nestjs/common';
import { Project } from '../../project.entity';
import { ProjectRepository } from '../../projectRepository';
import { ProjectId } from '../../value-object';

export class ProjectFindOne {
  constructor(private readonly _projectRepository: ProjectRepository) {}

  async run(id: string): Promise<Project> {
    const userId = new ProjectId(id);

    const user = await this._projectRepository.findOne(userId);

    if (!user) throw new BadRequestException('Project not found');

    return user;
  }
}
