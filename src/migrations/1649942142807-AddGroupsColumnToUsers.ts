import {MigrationInterface, QueryRunner} from "typeorm";

export class AddGroupsColumnToUsers1649942142807 implements MigrationInterface {
    name = 'AddGroupsColumnToUsers1649942142807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "groupId" TO "groups"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "groups"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "groups" character varying array NOT NULL DEFAULT '{user}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "groups"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "groups" character varying NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "groups" TO "groupId"`);
    }

}
