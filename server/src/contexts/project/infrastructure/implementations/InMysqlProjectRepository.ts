import { Project } from '../../domain/project.entity';
import { ProjectRepository } from '../../domain/projectRepository';

export class InMysqlProjectRepository implements ProjectRepository {
  async create(project: Project): Promise<Project> {
    console.log('llego a crear projecto');
    return project;
  }
}
