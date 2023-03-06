import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1677876428273 implements MigrationInterface {
    name = 'migration1677876428273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "price" integer NOT NULL, "img_URL" text NOT NULL, "stock" integer NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_7cfc24d6c24f0ec91294003d6b" ON "products" ("code") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_7cfc24d6c24f0ec91294003d6b"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
