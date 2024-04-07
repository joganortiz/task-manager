import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class TypeOrmBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    precision: 0,
    select: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    precision: 0,
    select: false,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
