import { UpdateUserDto } from 'src/contexts/users/infrastructure/http/dto';

export class ProjectUpdateUseCase {
  async run(_id: string, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    console.log(_id);
    return {};
  }
}
