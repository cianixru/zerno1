import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUniqueToObjects1650529287126 implements MigrationInterface {
    name = 'AddUniqueToObjects1650529287126'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "FK_688171fe1a16ba4490d13dcdd0e"`);
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "objId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "objects" ADD CONSTRAINT "UQ_a7ac54147928203fae0cb502e17" UNIQUE ("name")`);
        await queryRunner.query(`CREATE INDEX "index_zerno_agregator_objects__name" ON "objects" ("name") `);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "FK_688171fe1a16ba4490d13dcdd0e" FOREIGN KEY ("objId") REFERENCES "objects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "FK_688171fe1a16ba4490d13dcdd0e"`);
        await queryRunner.query(`DROP INDEX "public"."index_zerno_agregator_objects__name"`);
        await queryRunner.query(`ALTER TABLE "objects" DROP CONSTRAINT "UQ_a7ac54147928203fae0cb502e17"`);
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "objId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "FK_688171fe1a16ba4490d13dcdd0e" FOREIGN KEY ("objId") REFERENCES "objects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
