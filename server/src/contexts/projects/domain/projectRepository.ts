import { ProjectEntity } from '../infrastructure/sql/project.entity';
import { Project } from './project.entity';
import { ProjectId } from './value-object';
export type DataFinBy = {
  key: keyof ProjectEntity;
  value: any;
};

export interface ProjectRepository {
  create: (user: Project) => Promise<Project>;
  findAll(): Promise<Project[]>;
  findBy: (data: DataFinBy[], id?: ProjectId) => Promise<Project | null>;
  update: (id: ProjectId, user: Project) => Promise<Project>;
  remove: (id: ProjectId) => Promise<void>;
  findOne(_id: ProjectId): Promise<Project | null>;
}
