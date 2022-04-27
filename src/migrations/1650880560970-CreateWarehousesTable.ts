import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateWarehousesTable1650880560970 implements MigrationInterface {
    name = 'CreateWarehousesTable1650880560970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "warehouse" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying, "map" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_d5d5470e55d4238b1239e9f154b" UNIQUE ("name"), CONSTRAINT "PK_965abf9f99ae8c5983ae74ebde8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "warehouse"`);
    }

}
