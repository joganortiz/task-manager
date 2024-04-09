import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1712639025818 implements MigrationInterface {
    name = 'Init1712639025818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users_tokens\` (\`_id\` varchar(36) NOT NULL, \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`token\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL, \`expires_at\` timestamp NOT NULL, \`user_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_16796eb52a059007e7e4f5fa72\` (\`token\`), PRIMARY KEY (\`_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tasks\` (\`_id\` varchar(36) NOT NULL, \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`name\` varchar(55) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL, \`description\` longtext CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL, \`status\` enum ('pending', 'onHold', 'inProgress', 'underReview', 'completed') NOT NULL COMMENT '0->Not Confirmed 1->Confirmed' DEFAULT 'pending', PRIMARY KEY (\`_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notes\` (\`_id\` varchar(36) NOT NULL, \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`content\` longtext CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL, \`created_by\` varchar(36) NOT NULL, \`task_id\` varchar(36) NOT NULL, PRIMARY KEY (\`_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`_id\` varchar(36) NOT NULL, \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`name\` varchar(50) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL, \`last_name\` varchar(50) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL, \`email\` varchar(55) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL, \`password\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL, \`confirmed\` enum ('1', '0') NOT NULL COMMENT '0->Not Confirmed 1->Confirmed' DEFAULT '0', UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_450a05c0c4de5b75ac8d34835b\` (\`password\`), PRIMARY KEY (\`_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_tasks\` (\`_id\` varchar(36) NOT NULL, \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tasks_user_users_tasks\` (\`tasks__id\` varchar(36) NOT NULL, \`users_tasks__id\` varchar(36) NOT NULL, INDEX \`IDX_a64dcf609df74a761309997233\` (\`tasks__id\`), INDEX \`IDX_8d96843d62a8bd2fad0ae1c12f\` (\`users_tasks__id\`), PRIMARY KEY (\`tasks__id\`, \`users_tasks__id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_user_task_users_tasks\` (\`users__id\` varchar(36) NOT NULL, \`users_tasks__id\` varchar(36) NOT NULL, INDEX \`IDX_8855dd472e5fca41aa806b9238\` (\`users__id\`), INDEX \`IDX_57dc8acf1072992ac7711cd285\` (\`users_tasks__id\`), PRIMARY KEY (\`users__id\`, \`users_tasks__id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users_tokens\` ADD CONSTRAINT \`FK_user_token_user_id\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`_id\`) ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`notes\` ADD CONSTRAINT \`FK_note_user_id\` FOREIGN KEY (\`created_by\`) REFERENCES \`users\`(\`_id\`) ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`notes\` ADD CONSTRAINT \`FK_note_task_id\` FOREIGN KEY (\`task_id\`) REFERENCES \`tasks\`(\`_id\`) ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`tasks_user_users_tasks\` ADD CONSTRAINT \`FK_a64dcf609df74a7613099972336\` FOREIGN KEY (\`tasks__id\`) REFERENCES \`tasks\`(\`_id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`tasks_user_users_tasks\` ADD CONSTRAINT \`FK_8d96843d62a8bd2fad0ae1c12fd\` FOREIGN KEY (\`users_tasks__id\`) REFERENCES \`users_tasks\`(\`_id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_user_task_users_tasks\` ADD CONSTRAINT \`FK_8855dd472e5fca41aa806b92381\` FOREIGN KEY (\`users__id\`) REFERENCES \`users\`(\`_id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_user_task_users_tasks\` ADD CONSTRAINT \`FK_57dc8acf1072992ac7711cd2856\` FOREIGN KEY (\`users_tasks__id\`) REFERENCES \`users_tasks\`(\`_id\`) ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_user_task_users_tasks\` DROP FOREIGN KEY \`FK_57dc8acf1072992ac7711cd2856\``);
        await queryRunner.query(`ALTER TABLE \`users_user_task_users_tasks\` DROP FOREIGN KEY \`FK_8855dd472e5fca41aa806b92381\``);
        await queryRunner.query(`ALTER TABLE \`tasks_user_users_tasks\` DROP FOREIGN KEY \`FK_8d96843d62a8bd2fad0ae1c12fd\``);
        await queryRunner.query(`ALTER TABLE \`tasks_user_users_tasks\` DROP FOREIGN KEY \`FK_a64dcf609df74a7613099972336\``);
        await queryRunner.query(`ALTER TABLE \`notes\` DROP FOREIGN KEY \`FK_note_task_id\``);
        await queryRunner.query(`ALTER TABLE \`notes\` DROP FOREIGN KEY \`FK_note_user_id\``);
        await queryRunner.query(`ALTER TABLE \`users_tokens\` DROP FOREIGN KEY \`FK_user_token_user_id\``);
        await queryRunner.query(`DROP INDEX \`IDX_57dc8acf1072992ac7711cd285\` ON \`users_user_task_users_tasks\``);
        await queryRunner.query(`DROP INDEX \`IDX_8855dd472e5fca41aa806b9238\` ON \`users_user_task_users_tasks\``);
        await queryRunner.query(`DROP TABLE \`users_user_task_users_tasks\``);
        await queryRunner.query(`DROP INDEX \`IDX_8d96843d62a8bd2fad0ae1c12f\` ON \`tasks_user_users_tasks\``);
        await queryRunner.query(`DROP INDEX \`IDX_a64dcf609df74a761309997233\` ON \`tasks_user_users_tasks\``);
        await queryRunner.query(`DROP TABLE \`tasks_user_users_tasks\``);
        await queryRunner.query(`DROP TABLE \`users_tasks\``);
        await queryRunner.query(`DROP INDEX \`IDX_450a05c0c4de5b75ac8d34835b\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`notes\``);
        await queryRunner.query(`DROP TABLE \`tasks\``);
        await queryRunner.query(`DROP INDEX \`IDX_16796eb52a059007e7e4f5fa72\` ON \`users_tokens\``);
        await queryRunner.query(`DROP TABLE \`users_tokens\``);
    }

}
