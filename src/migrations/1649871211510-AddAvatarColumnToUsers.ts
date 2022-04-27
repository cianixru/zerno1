import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAvatarColumnToUsers1649871211510 implements MigrationInterface {
    name = 'AddAvatarColumnToUsers1649871211510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "avatar" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar"`);
    }

}
