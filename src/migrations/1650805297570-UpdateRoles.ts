import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateRoles1650805297570 implements MigrationInterface {
    name = 'UpdateRoles1650805297570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."roles_name_enum" RENAME TO "roles_name_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."roles_name_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "name" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "name" TYPE "public"."roles_name_enum" USING "name"::"text"::"public"."roles_name_enum"`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "name" SET DEFAULT 'user'`);
        await queryRunner.query(`DROP TYPE "public"."roles_name_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."companies_roletypeid_enum" RENAME TO "companies_roletypeid_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."companies_roletypeid_enum" AS ENUM('grower', 'buyer', 'trader', 'carrier')`);
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "roleTypeId" TYPE "public"."companies_roletypeid_enum" USING "roleTypeId"::"text"::"public"."companies_roletypeid_enum"`);
        await queryRunner.query(`DROP TYPE "public"."companies_roletypeid_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."companies_roletypeid_enum_old" AS ENUM('admin', 'grower', 'buyer', 'trader', 'carrier')`);
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "roleTypeId" TYPE "public"."companies_roletypeid_enum_old" USING "roleTypeId"::"text"::"public"."companies_roletypeid_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."companies_roletypeid_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."companies_roletypeid_enum_old" RENAME TO "companies_roletypeid_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."roles_name_enum_old" AS ENUM('admin', 'grower', 'buyer', 'trader', 'carrier')`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "name" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "name" TYPE "public"."roles_name_enum_old" USING "name"::"text"::"public"."roles_name_enum_old"`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "name" SET DEFAULT 'grower'`);
        await queryRunner.query(`DROP TYPE "public"."roles_name_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."roles_name_enum_old" RENAME TO "roles_name_enum"`);
    }

}
