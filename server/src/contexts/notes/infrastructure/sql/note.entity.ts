import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../../../users/infrastructure/sql/user.entity';
import { TypeOrmBaseEntity } from '../../../../config/TypeOrmBaseEntity';
import { TaskEntity } from '../../../../contexts/tasks/infrastructure/sql/task.entity';

@Entity({ name: 'notes' })
export class NoteEntity extends TypeOrmBaseEntity {
  @Column({
    type: 'longtext',
    nullable: false,
    charset: 'utf8mb4',
    collation: 'utf8mb4_general_ci',
  })
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.createdBy, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({
    name: 'created_by',
    foreignKeyConstraintName: 'FK_note_user_id',
  })
  createdBy: UserEntity;

  @ManyToOne(() => TaskEntity, (task) => task.NoteTaskId, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({
    name: 'task_id',
    foreignKeyConstraintName: 'FK_note_task_id',
  })
  NoteTaskId: TaskEntity;
}
