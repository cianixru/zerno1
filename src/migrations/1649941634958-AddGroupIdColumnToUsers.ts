import {MigrationInterface, QueryRunner} from "typeorm";

export class AddGroupIdColumnToUsers1649941634958 implements MigrationInterface {
    name = 'AddGroupIdColumnToUsers1649941634958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "groupId" character varying NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "groupId"`);
    }

}
