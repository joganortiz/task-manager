import { Project } from 'src/contexts/projects/domain/project.entity';
import { ProjectRepository } from 'src/contexts/projects/domain/projectRepository';

export class ProjectFindAllUseCase {
  constructor(private readonly _projectRepository: ProjectRepository) {}
  async run() {
    const projects: Project[] = await this._projectRepository.findAll();

    return projects.map((project) => project.toPrimitives());
  }
}
