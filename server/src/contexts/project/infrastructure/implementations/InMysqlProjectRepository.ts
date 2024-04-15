import { UserEntity } from 'src/contexts/users/infrastructure/sql/user.entity';
import { Project } from '../../domain/project.entity';
import { ProjectRepository } from '../../domain/projectRepository';
import { ProjectEntity } from '../sql/project.entity';

export class InMysqlProjectRepository implements ProjectRepository {
  async create(project: Project): Promise<Project> {
    const prepareProject = new ProjectEntity();
    prepareProject._id = project._id._value;
    prepareProject.name = project.name._value;
    prepareProject.clientName = project.clientName._value;
    prepareProject.description = project.description._value;
    const prepareManager = new UserEntity();
    prepareManager._id = project.manager._id._value;
    prepareProject.manager = prepareManager;
    await prepareProject.save();

    return project;
  }
}
