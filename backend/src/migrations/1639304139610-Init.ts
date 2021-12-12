import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1639304139610 implements MigrationInterface {
  name = "Init1639304139610";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`izin\` (\`id\` int NOT NULL AUTO_INCREMENT, \`number\` varchar(255) NOT NULL, \`type\` enum ('Perorangan', 'Perusahaan') NOT NULL DEFAULT 'Perorangan', \`name\` varchar(255) NOT NULL, \`effectiveDate\` date NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_61ea4f3ab0594d89f601bbe3fe\` (\`number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS\`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('dpmptsp-operator', 'api-consumer-bapenda') NOT NULL DEFAULT 'dpmptsp-operator', \`apiToken\` text NULL, \`tokenVersion\` int NOT NULL DEFAULT '0', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_62ad461c58393b337dffc03a0a\` (\`apiToken\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_62ad461c58393b337dffc03a0a\` ON \`user\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_61ea4f3ab0594d89f601bbe3fe\` ON \`izin\``
    );
    await queryRunner.query(`DROP TABLE \`izin\``);
  }
}
