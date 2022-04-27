import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnRefreshTokenToUsers1649797939259 implements MigrationInterface {
    name = 'AddColumnRefreshTokenToUsers1649797939259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "refreshToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
    }

}
