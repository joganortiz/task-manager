import { Project } from './project.entity';

export interface ProjectRepository {
  create: (user: Project) => Promise<Project>;
  // findAll: () => Promise<User[]>;
  // findOne: (_id: UserId) => Promise<User | null>;
  // update: (id: UserId, user: User) => Promise<User>;
  // remove: (id: UserId) => Promise<void>;
}
