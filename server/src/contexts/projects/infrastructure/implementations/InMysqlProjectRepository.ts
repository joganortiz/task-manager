import { UserEntity } from 'src/contexts/users/infrastructure/sql/user.entity';
import { Project } from '../../domain/project.entity';
import { DataFinBy, ProjectRepository } from '../../domain/projectRepository';
import { ProjectEntity } from '../sql/project.entity';
import { ProjectId } from '../../domain/value-object';
import { FindOptionsWhere, Not } from 'typeorm';

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

  async findBy(data: DataFinBy[], _id?: ProjectId): Promise<Project | null> {
    const where: FindOptionsWhere<ProjectEntity> =
      {} as FindOptionsWhere<ProjectEntity>;

    data.find((item) => {
      const key: keyof Project = item.key;
      where[key] = item.value;
    });

    // validate exist _id
    if (_id != undefined) {
      where['_id'] = Not(_id._value);
    }

    // validate exist project
    const project = await ProjectEntity.findOne({
      relations: {
        manager: true,
      },
      where: where,
    });

    if (project === null) return null;

    return Project.fromPrimitives(project);
  }
}
