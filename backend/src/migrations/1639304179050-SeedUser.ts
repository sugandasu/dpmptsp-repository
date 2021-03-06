import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedUser1639304179050 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO \`user\` (\`id\`, \`username\`, \`email\`, \`password\`, \`role\`, \`createdAt\`, \`updatedAt\`, \`tokenVersion\`, \`apiToken\`) VALUES (1,'operator','operator@dpmptsp.com','$argon2i$v=19$m=4096,t=3,p=1$H29hhHMCqNOV6MFs5UosHA$0e6prt/67FLYVu84pMzbvNchyMH1W51r35wS0Qk3pYs','dpmptsp-operator','2021-12-10 09:56:37.000000','2021-12-10 09:56:37.000000',0,NULL),(2,'bapenda','bapenda@bapenda.com', '$argon2i$v=19$m=4096,t=3,p=1$H29hhHMCqNOV6MFs5UosHA$0e6prt/67FLYVu84pMzbvNchyMH1W51r35wS0Qk3pYs','api-consumer-bapenda','2021-11-21 12:34:05.988264','2021-12-10 06:28:51.000000',0,NULL)`
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
