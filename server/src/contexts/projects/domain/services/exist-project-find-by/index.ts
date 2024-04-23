import { Project } from '../../project.entity';
import { DataFinBy, ProjectRepository } from '../../projectRepository';
import { ProjectId } from '../../value-object';

export class ExistProjectFindBy {
  constructor(private readonly _projectRepository: ProjectRepository) {}

  async run(data: DataFinBy[], _id?: string): Promise<Project | false> {
    const prepareId: ProjectId | undefined = _id
      ? new ProjectId(_id)
      : undefined;

    const project: Project | null = await this._projectRepository.findBy(
      data,
      prepareId,
    );

    if (project !== null) return project;

    return false;
  }
}
