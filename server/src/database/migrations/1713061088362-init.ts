import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1713061088362 implements MigrationInterface {
    name = 'Init1713061088362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users_tokens\` (\`_id\` varchar(36) NOT NULL, \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`token\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL, \`expires_at\` timestamp NOT NULL, \`user_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_16796eb52a059007e7e4f5fa72\` (\`token\`), PRIMARY KEY (\`_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tasks\` (\`_id\` varchar(36) NOT NULL, \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`name\` varchar(55) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL, \`description\` longtext CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL, \`status\` enum ('pending', 'onHold', 'inProgress', 'underReview', 'completed') NOT NULL COMMENT '0->Not Confirmed 1->Confirmed' DEFAULT 'pending', \`project_id\` varchar(36) NULL, PRIMARY KEY (\`_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`projects\` (\`_id\` varchar(36) NOT NULL, \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`name\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL, \`client_name\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL, \`description\` longtext NOT NULL, \`user_id\` varchar(36) NULL, UNIQUE INDEX \`REL_bd55b203eb9f92b0c839038001\` (\`user_id\`), PRIMARY KEY (\`_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`_id\` varchar(36) NOT NULL, \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`name\` varchar(50) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL, \`last_name\` varchar(50) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL, \`email\` varchar(55) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL, \`password\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL, \`confirmed\` enum ('1', '0') NOT NULL COMMENT '0->Not Confirmed 1->Confirmed' DEFAULT '0', UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_450a05c0c4de5b75ac8d34835b\` (\`password\`), PRIMARY KEY (\`_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users_tokens\` ADD CONSTRAINT \`FK_user_token_user_id\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`_id\`) ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_task_project_id\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`_id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`projects\` ADD CONSTRAINT \`FK_project_user_id\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`_id\`) ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_project_user_id\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_task_project_id\``);
        await queryRunner.query(`ALTER TABLE \`users_tokens\` DROP FOREIGN KEY \`FK_user_token_user_id\``);
        await queryRunner.query(`DROP INDEX \`IDX_450a05c0c4de5b75ac8d34835b\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`REL_bd55b203eb9f92b0c839038001\` ON \`projects\``);
        await queryRunner.query(`DROP TABLE \`projects\``);
        await queryRunner.query(`DROP TABLE \`tasks\``);
        await queryRunner.query(`DROP INDEX \`IDX_16796eb52a059007e7e4f5fa72\` ON \`users_tokens\``);
        await queryRunner.query(`DROP TABLE \`users_tokens\``);
    }

}
