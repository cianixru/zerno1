import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateCompaniesRoleType1650355483267 implements MigrationInterface {
    name = 'UpdateCompaniesRoleType1650355483267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "name"`);
        await queryRunner.query(`CREATE TYPE "public"."roles_name_enum" AS ENUM('admin', 'grower', 'buyer', 'trader', 'carrier')`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "name" "public"."roles_name_enum" NOT NULL DEFAULT 'grower'`);
        await queryRunner.query(`ALTER TYPE "public"."companies_roletypeid_enum" RENAME TO "companies_roletypeid_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."companies_roletypeid_enum" AS ENUM('admin', 'grower', 'buyer', 'trader', 'carrier')`);
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "roleTypeId" TYPE "public"."companies_roletypeid_enum" USING "roleTypeId"::"text"::"public"."companies_roletypeid_enum"`);
        await queryRunner.query(`DROP TYPE "public"."companies_roletypeid_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."companies_roletypeid_enum_old" AS ENUM('grower', 'buyer', 'trader', 'carrier')`);
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "roleTypeId" TYPE "public"."companies_roletypeid_enum_old" USING "roleTypeId"::"text"::"public"."companies_roletypeid_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."companies_roletypeid_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."companies_roletypeid_enum_old" RENAME TO "companies_roletypeid_enum"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "name"`);
        await queryRunner.query(`DROP TYPE "public"."roles_name_enum"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "name" character varying NOT NULL`);
    }

}
