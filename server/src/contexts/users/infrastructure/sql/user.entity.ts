import { UserTokenEntity } from '../../../../contexts/token-users/infrastructure/sql/token-user.entity';
import { TypeOrmBaseEntity } from '../../../../config/TypeOrmBaseEntity';
import { Column, Entity, OneToMany } from 'typeorm';

export enum ConfirmedType {
  CONFIRMED = '1',
  NOT_CONFIRMED = '0',
}

@Entity({ name: 'users' })
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

  @OneToMany(() => UserTokenEntity, (user) => user.user)
  user: UserTokenEntity[];
}