import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedUser1639304179050 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        SET NAMES utf8mb4;

        INSERT INTO \`user\` (\`username\`, \`email\`, \`password\`, \`role\`, \`createdAt\`, \`updatedAt\`, \`tokenVersion\`, \`apiToken\`) VALUES
        ('bapenda',	'bapenda@bapenda.com',	'$argon2i$v=19$m=4096,t=3,p=1$H29hhHMCqNOV6MFs5UosHA$0e6prt/67FLYVu84pMzbvNchyMH1W51r35wS0Qk3pYs',	'api-consumer-bapenda',	'2021-11-21 12:34:05.988264',	'2021-12-10 06:28:51.000000',	0,	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpYXQiOjE2MzkxMTc3MzEsImV4cCI6MTYzOTExODYzMX0.5Qs3iU_gUoi-_BYCM5QoRkIVJSZy_yFcTP1K1ts_Otw'),
        ('operator',	'operator@dpmptsp.com',	'$argon2i$v=19$m=4096,t=3,p=1$H29hhHMCqNOV6MFs5UosHA$0e6prt/67FLYVu84pMzbvNchyMH1W51r35wS0Qk3pYs',	'dpmptsp-operator',	'2021-12-10 09:56:37.000000',	'2021-12-10 09:56:37.000000',	0,	NULL);
    `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        DELETE FROM \`user\` WHERE \`username\` IN ('bapenda', 'operator');
    `
    );
  }
}
