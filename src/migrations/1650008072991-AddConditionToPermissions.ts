import {MigrationInterface, QueryRunner} from "typeorm";

export class AddConditionToPermissions1650008072991 implements MigrationInterface {
    name = 'AddConditionToPermissions1650008072991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" ADD "condition" json`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "condition"`);
    }

}
