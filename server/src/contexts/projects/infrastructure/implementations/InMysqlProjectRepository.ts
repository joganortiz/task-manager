import { UserEntity } from 'src/contexts/users/infrastructure/sql/user.entity';
import { Project } from '../../domain/project.entity';
import { DataFinBy, ProjectRepository } from '../../domain/projectRepository';
import { ProjectEntity } from '../sql/project.entity';
import { ProjectId } from '../../domain/value-object';
import { Not } from 'typeorm';

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

  async findAll(): Promise<Project[]> {
    const projects = await ProjectEntity.find({
      select: {
        manager: {
          _id: true,
          name: true,
        },
      },
      relations: {
        manager: true,
      },
    });
    return projects.map((project) => Project.fromPrimitives(project));
  }

  async findOne(_id: ProjectId): Promise<Project | null> {
    const project = await ProjectEntity.findOne({
      select: {
        manager: {
          _id: true,
          name: true,
        },
      },
      relations: {
        manager: true,
      },
      where: {
        _id: _id._value,
      },
    });

    if (project === null) return null;

    return Project.fromPrimitives(project);
  }

  async update(_id: ProjectId, project: Project): Promise<Project> {
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

  async remove(_id: ProjectId): Promise<void> {
    await ProjectEntity.delete({ _id: _id._value });
  }

  async findBy(data: DataFinBy[], _id?: ProjectId): Promise<Project | null> {
    const where = {};

    data.find((item: DataFinBy) => {
      where[item.key] = item.value;
    });

    // validate exist _id
    if (_id != undefined) {
      where['_id'] = Not(_id._value);
    }

    // validate exist project
    const project = await ProjectEntity.findOne({
      select: { manager: { _id: true } },
      relations: {
        manager: true,
      },
      where: where,
    });

    if (project === null) return null;

    return Project.fromPrimitives(project);
  }
}
