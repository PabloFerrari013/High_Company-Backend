import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1677716309087 implements MigrationInterface {
    name = 'migration1677716309087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" varchar PRIMARY KEY NOT NULL, "code" varchar NOT NULL, "name" text NOT NULL, "price" integer NOT NULL, "img_URL" text NOT NULL, "stock" integer NOT NULL)`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_7cfc24d6c24f0ec91294003d6b" ON "products" ("code") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_7cfc24d6c24f0ec91294003d6b"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
