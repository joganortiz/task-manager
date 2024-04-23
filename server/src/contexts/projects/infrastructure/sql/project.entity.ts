import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { TypeOrmBaseEntity } from '../../../../config/TypeOrmBaseEntity';
import { UserEntity } from '../../../../contexts/users/infrastructure/sql/user.entity';
import { TaskEntity } from '../../../../contexts/tasks/infrastructure/sql/task.entity';

@Entity({ name: 'projects' })
export class ProjectEntity extends TypeOrmBaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    charset: 'utf8mb4',
    collation: 'utf8mb4_general_ci',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    charset: 'utf8mb4',
    collation: 'utf8mb4_general_ci',
  })
  clientName: string;

  @Column({
    type: 'longtext',
    nullable: false,
  })
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.manager, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
    nullable: true,
  })
  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'FK_project_user_id',
  })
  manager: UserEntity;

  @OneToMany(() => TaskEntity, (task) => task.project)
  tasks: TaskEntity[];
}
