import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1596402115037 implements MigrationInterface {
  name = 'Initial1596402115037';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" bytea, "googleId" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "cuisine" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "UQ_c20d6dadcb706bc7f59dc18b147" UNIQUE ("userId", "name"), CONSTRAINT "PK_ba1a5d397c2be5a37057ec73382" PRIMARY KEY ("id", "userId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "image_meta" ("id" character varying NOT NULL, "url" character varying, "filename" character varying, "mimetype" character varying, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "modifiedDate" TIMESTAMP NOT NULL DEFAULT now(), "order" integer, "recipeId" integer, CONSTRAINT "PK_788f9bce5c02d7f0715d3592dc2" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "recipe_ingredient" ("id" integer NOT NULL, "quantity" integer NOT NULL, "item" character varying NOT NULL, "measure" character varying, "group" character varying, "notes" character varying, "recipeId" integer NOT NULL, CONSTRAINT "PK_2f330cd9833cac244c46bccfa33" PRIMARY KEY ("id", "recipeId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "recipe_step" ("id" integer NOT NULL, "description" character varying(8000) NOT NULL, "recipeId" integer NOT NULL, CONSTRAINT "PK_cefd28d0f4f5cfdccd62e872ea3" PRIMARY KEY ("id", "recipeId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "recipe" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying(8000), "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "modifiedDate" TIMESTAMP NOT NULL DEFAULT now(), "imageUrl" character varying, "prepTime" integer, "cookTime" integer, "yield" integer, "sourceUrl" character varying, "user_id" integer NOT NULL, CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "UQ_4760fde1380c4d39297a2e1f98c" UNIQUE ("name", "userId"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "recipe_categories_category" ("recipeId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_0259be6182af9c563a28ca399da" PRIMARY KEY ("recipeId", "categoryId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5ccd26151b1b1dbc4610aa9143" ON "recipe_categories_category" ("recipeId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_20b2cfc776de9e8424c519d099" ON "recipe_categories_category" ("categoryId") `
    );
    await queryRunner.query(
      `CREATE TABLE "recipe_cuisines_cuisine" ("recipeId" integer NOT NULL, "cuisineId" integer NOT NULL, "cuisineUserId" integer NOT NULL, CONSTRAINT "PK_57159283e01041bc306bc4b1944" PRIMARY KEY ("recipeId", "cuisineId", "cuisineUserId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d78746e9076901c759521e8d37" ON "recipe_cuisines_cuisine" ("recipeId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b24aa0fd9ef094a8fdca0803a2" ON "recipe_cuisines_cuisine" ("cuisineId", "cuisineUserId") `
    );
    await queryRunner.query(
      `ALTER TABLE "cuisine" ADD CONSTRAINT "FK_146ebc68cbae5e85296972c9283" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "image_meta" ADD CONSTRAINT "FK_c422e62eff68e88ec2c0a1bbb1d" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "FK_1ad3257a7350c39854071fba211" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_step" ADD CONSTRAINT "FK_1c52f396004dadfb9357f762268" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "recipe" ADD CONSTRAINT "FK_385770dfbf5b275c495dd298546" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD CONSTRAINT "FK_32b856438dffdc269fa84434d9f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_categories_category" ADD CONSTRAINT "FK_5ccd26151b1b1dbc4610aa9143a" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_categories_category" ADD CONSTRAINT "FK_20b2cfc776de9e8424c519d0997" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_cuisines_cuisine" ADD CONSTRAINT "FK_d78746e9076901c759521e8d37b" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_cuisines_cuisine" ADD CONSTRAINT "FK_b24aa0fd9ef094a8fdca0803a2e" FOREIGN KEY ("cuisineId", "cuisineUserId") REFERENCES "cuisine"("id","userId") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recipe_cuisines_cuisine" DROP CONSTRAINT "FK_b24aa0fd9ef094a8fdca0803a2e"`
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_cuisines_cuisine" DROP CONSTRAINT "FK_d78746e9076901c759521e8d37b"`
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_categories_category" DROP CONSTRAINT "FK_20b2cfc776de9e8424c519d0997"`
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_categories_category" DROP CONSTRAINT "FK_5ccd26151b1b1dbc4610aa9143a"`
    );
    await queryRunner.query(
      `ALTER TABLE "category" DROP CONSTRAINT "FK_32b856438dffdc269fa84434d9f"`
    );
    await queryRunner.query(
      `ALTER TABLE "recipe" DROP CONSTRAINT "FK_385770dfbf5b275c495dd298546"`
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_step" DROP CONSTRAINT "FK_1c52f396004dadfb9357f762268"`
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_ingredient" DROP CONSTRAINT "FK_1ad3257a7350c39854071fba211"`
    );
    await queryRunner.query(
      `ALTER TABLE "image_meta" DROP CONSTRAINT "FK_c422e62eff68e88ec2c0a1bbb1d"`
    );
    await queryRunner.query(
      `ALTER TABLE "cuisine" DROP CONSTRAINT "FK_146ebc68cbae5e85296972c9283"`
    );
    await queryRunner.query(`DROP INDEX "IDX_b24aa0fd9ef094a8fdca0803a2"`);
    await queryRunner.query(`DROP INDEX "IDX_d78746e9076901c759521e8d37"`);
    await queryRunner.query(`DROP TABLE "recipe_cuisines_cuisine"`);
    await queryRunner.query(`DROP INDEX "IDX_20b2cfc776de9e8424c519d099"`);
    await queryRunner.query(`DROP INDEX "IDX_5ccd26151b1b1dbc4610aa9143"`);
    await queryRunner.query(`DROP TABLE "recipe_categories_category"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "recipe"`);
    await queryRunner.query(`DROP TABLE "recipe_step"`);
    await queryRunner.query(`DROP TABLE "recipe_ingredient"`);
    await queryRunner.query(`DROP TABLE "image_meta"`);
    await queryRunner.query(`DROP TABLE "cuisine"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
