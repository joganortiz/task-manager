import { UserEntity } from '../../../../contexts/users/infrastructure/sql/user.entity';
import { TypeOrmBaseEntity } from '../../../../config/TypeOrmBaseEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'users_tokens' })
export class UserTokenEntity extends TypeOrmBaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
    charset: 'utf8mb4',
    collation: 'utf8mb4_general_ci',
  })
  token: string;

  @ManyToOne(() => UserEntity, (user) => user.user, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
    nullable: true,
  })
  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'FK_user_token_user_id',
  })
  user: UserEntity;

  @Column({
    type: 'timestamp',
    name: 'expires_at',
    nullable: false,
    select: false,
    default: () => {
      const fecha = new Date();
      const minutes = fecha.getMinutes();

      fecha.setMinutes(minutes + 10);
      return fecha;
    },
  })
  expiresAt: Date;
}
