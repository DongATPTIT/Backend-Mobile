import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1716351047376 implements MigrationInterface {
    name = ' $npmConfigName1716351047376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`test\` (\`id\` int NOT NULL AUTO_INCREMENT, \`time\` time NULL, \`status\` tinyint NOT NULL DEFAULT 0, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`device-session\` DROP COLUMN \`secretKey\``);
        await queryRunner.query(`ALTER TABLE \`device-session\` DROP COLUMN \`ua\``);
        await queryRunner.query(`ALTER TABLE \`test\` ADD CONSTRAINT \`FK_394889f330e608a61edd1163cdf\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`test\` DROP FOREIGN KEY \`FK_394889f330e608a61edd1163cdf\``);
        await queryRunner.query(`ALTER TABLE \`device-session\` ADD \`ua\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`device-session\` ADD \`secretKey\` varchar(255) NULL`);
        await queryRunner.query(`DROP TABLE \`test\``);
    }

}
