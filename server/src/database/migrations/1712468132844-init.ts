import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1712468132844 implements MigrationInterface {
  name = 'Init1712468132844';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`_id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(50) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL, \`last_name\` varchar(50) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL, \`email\` varchar(55) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL, \`password\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL, \`confirmed\` enum ('1', '0') NOT NULL COMMENT '0->Not Confirmed 1->Confirmed' DEFAULT '0', UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_450a05c0c4de5b75ac8d34835b\` (\`password\`), PRIMARY KEY (\`_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users_tokens\` (\`_id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`token\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL, \`expires_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`user_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_16796eb52a059007e7e4f5fa72\` (\`token\`), PRIMARY KEY (\`_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_tokens\` ADD CONSTRAINT \`FK_user_token_user_id\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`_id\`) ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users_tokens\` DROP FOREIGN KEY \`FK_user_token_user_id\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_16796eb52a059007e7e4f5fa72\` ON \`users_tokens\``,
    );
    await queryRunner.query(`DROP TABLE \`users_tokens\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_450a05c0c4de5b75ac8d34835b\` ON \`users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
