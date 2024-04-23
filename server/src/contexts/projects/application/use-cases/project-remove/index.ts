import { ProjectRepository } from 'src/contexts/projects/domain/projectRepository';
import { ProjectFindOne } from 'src/contexts/projects/domain/services';

export class ProjectRemoveUseCase {
  private readonly _projectFindOne: ProjectFindOne;
  constructor(private readonly _projectRepository: ProjectRepository) {
    this._projectFindOne = new ProjectFindOne(this._projectRepository);
  }

  async run(_id: string) {
    const project = await this._projectFindOne.run(_id);

    await this._projectRepository.remove(project._id);

    return project.toPrimitives();
  }
}
