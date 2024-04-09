import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { TypeOrmBaseEntity } from '../../../../config/TypeOrmBaseEntity';
import { UserTaskEntity } from '../../../../contexts/users-tasks/infrastructure/sql/user-task.entity';
import { NoteEntity } from '../../../../contexts/notes/infrastructure/sql/note.entity';

export enum StatusType {
  PENDING = 'pending',
  ON_HOLD = 'onHold',
  IN_PROGRESS = 'inProgress',
  UNDER_REVIEW = 'underReview',
  COMPLETED = 'completed',
}

@Entity({ name: 'tasks' })
export class TaskEntity extends TypeOrmBaseEntity {
  @Column({
    type: 'varchar',
    length: 55,
    nullable: false,
    charset: 'utf8mb4',
    collation: 'utf8mb4_general_ci',
  })
  name: string;

  @Column({
    type: 'longtext',
    nullable: false,
    charset: 'utf8mb4',
    collation: 'utf8mb4_general_ci',
  })
  description: string;

  @Column({
    type: 'enum',
    enum: StatusType,
    nullable: false,
    default: StatusType.PENDING,
    comment: '0->Not Confirmed 1->Confirmed',
  })
  status: StatusType;

  @ManyToMany(() => UserTaskEntity)
  @JoinTable()
  user: UserTaskEntity[];

  @ManyToMany(() => NoteEntity, (note) => note.NoteTaskId)
  NoteTaskId: NoteEntity[];
}
