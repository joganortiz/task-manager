import { Project } from './project.entity';
import { ProjectId } from './value-object';
export type DataFinBy = {
  key: keyof Project;
  value: any;
};

export interface ProjectRepository {
  create: (user: Project) => Promise<Project>;
  findBy: (data: DataFinBy[], id?: ProjectId) => Promise<Project | null>;
}
