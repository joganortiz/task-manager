import { Entity, JoinTable, ManyToMany } from 'typeorm';
import { UserEntity } from '../../../users/infrastructure/sql/user.entity';
import { TypeOrmBaseEntity } from '../../../../config/TypeOrmBaseEntity';

@Entity({ name: 'users_tasks' })
export class UserTaskEntity extends TypeOrmBaseEntity {
  @ManyToMany(() => UserEntity, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinTable({
    name: 'user_id',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: '_id',
      foreignKeyConstraintName: 'FK_user_task_user_id',
    },
    inverseJoinColumn: {
      name: 'task_id',
      referencedColumnName: '_id',
      foreignKeyConstraintName: 'FK_user_task_task_id',
    },
    synchronize: false,
  })
  users: UserEntity[];
}
