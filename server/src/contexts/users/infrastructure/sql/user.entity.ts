import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { UserTokenEntity } from '../../../../contexts/users-token/infrastructure/sql/user-token.entity';
import { TypeOrmBaseEntity } from '../../../../config/TypeOrmBaseEntity';
import { ProjectEntity } from '../../../../contexts/projects/infrastructure/sql/project.entity';

export enum ConfirmedType {
  CONFIRMED = '1',
  NOT_CONFIRMED = '0',
}

@Entity({ name: 'users', orderBy: {
  createdAt: "DESC",
  _id: "DESC"
} })
export class UserEntity extends TypeOrmBaseEntity {
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    charset: 'utf8mb4',
    collation: 'utf8mb4_general_ci',
  })
  name: string;

  @Column({
    type: 'varchar',
    name: 'last_name',
    length: 50,
    nullable: false,
    charset: 'utf8mb4',
    collation: 'utf8mb4_general_ci',
  })
  lastName: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 55,
    nullable: false,
    unique: true,
    charset: 'utf8mb4',
    collation: 'utf8mb4_general_ci',
    foreignKeyConstraintName: 'UNIQUE_email_user',
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    charset: 'utf8mb4',
    collation: 'utf8mb4_general_ci',
    unique: true,
    select: false,
    foreignKeyConstraintName: 'UNIQUE_password_user',
  })
  password: string;

  @Column({
    type: 'enum',
    enum: ConfirmedType,
    nullable: false,
    default: ConfirmedType.NOT_CONFIRMED,
    comment: '0->Not Confirmed 1->Confirmed',
    select: false,
  })
  confirmed?: ConfirmedType;

  @OneToMany(() => UserTokenEntity, (userToken) => userToken.user)
  user: UserTokenEntity[];

  @OneToMany(() => ProjectEntity, (project) => project.manager)
  manager: ProjectEntity;
}
