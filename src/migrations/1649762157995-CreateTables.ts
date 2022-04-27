import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTables1649762157995 implements MigrationInterface {
    name = 'CreateTables1649762157995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "crops" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_33e6399d4c7cedd12806d5d4dd7" UNIQUE ("name"), CONSTRAINT "PK_098dbeb7c803dc7c08a7f02b805" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "crop_parameters" ("id" SERIAL NOT NULL, "cropId" integer NOT NULL, "name" character varying NOT NULL, "value" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_371bd4678721d5b676e5882e16d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company_signers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "patronymic" character varying NOT NULL, "surname" character varying NOT NULL, "companyId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_ecbfaee6ba7afa086ec5cb9dfcd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bank_details" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "paymentAccount" character varying, "correspondentAccount" character varying, "bic" character varying, "companyId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_ddbbcb9586b7f4d6124fe58f257" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "edm_operator" ("id" SERIAL NOT NULL, "name" character varying, "edmId" character varying, "companyId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_f993d47aef8fbf3d335abe9c622" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "phoneNumber" character varying NOT NULL, "secret" character varying, "name" character varying, "patronymic" character varying, "surname" character varying, "email" character varying, "companyId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_1e3d0240b49c40521aaeb953293" UNIQUE ("phoneNumber"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "index_zerno_agregator_users__phone_number" ON "users" ("phoneNumber") `);
        await queryRunner.query(`CREATE TYPE "public"."companies_roletypeid_enum" AS ENUM('grower', 'buyer', 'trader', 'carrier')`);
        await queryRunner.query(`CREATE TABLE "companies" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "roleTypeId" "public"."companies_roletypeid_enum" NOT NULL, "inn" character varying, "kpp" character varying, "okved" character varying, "okveds" character varying array, "address" character varying, "nds" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "userId" integer, CONSTRAINT "UQ_491fd83f2d6432e38cd99d8503c" UNIQUE ("inn"), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "index_zerno_agregator_companies__inn" ON "companies" ("inn") `);
        await queryRunner.query(`ALTER TABLE "crop_parameters" ADD CONSTRAINT "FK_14bd0ff91fb9a36e09bd2077cd1" FOREIGN KEY ("cropId") REFERENCES "crops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company_signers" ADD CONSTRAINT "FK_962782caf010e5ca88150df723d" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bank_details" ADD CONSTRAINT "FK_ba395eac106876c36235467f8d4" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "edm_operator" ADD CONSTRAINT "FK_78eaa71f39975a3660b8c3de235" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_6d64e8c7527a9e4af83cc66cbf7" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_6d64e8c7527a9e4af83cc66cbf7"`);
        await queryRunner.query(`ALTER TABLE "edm_operator" DROP CONSTRAINT "FK_78eaa71f39975a3660b8c3de235"`);
        await queryRunner.query(`ALTER TABLE "bank_details" DROP CONSTRAINT "FK_ba395eac106876c36235467f8d4"`);
        await queryRunner.query(`ALTER TABLE "company_signers" DROP CONSTRAINT "FK_962782caf010e5ca88150df723d"`);
        await queryRunner.query(`ALTER TABLE "crop_parameters" DROP CONSTRAINT "FK_14bd0ff91fb9a36e09bd2077cd1"`);
        await queryRunner.query(`DROP INDEX "public"."index_zerno_agregator_companies__inn"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TYPE "public"."companies_roletypeid_enum"`);
        await queryRunner.query(`DROP INDEX "public"."index_zerno_agregator_users__phone_number"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "edm_operator"`);
        await queryRunner.query(`DROP TABLE "bank_details"`);
        await queryRunner.query(`DROP TABLE "company_signers"`);
        await queryRunner.query(`DROP TABLE "crop_parameters"`);
        await queryRunner.query(`DROP TABLE "crops"`);
    }

}
