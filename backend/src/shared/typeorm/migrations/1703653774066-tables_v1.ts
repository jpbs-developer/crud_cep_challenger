import { MigrationInterface, QueryRunner } from 'typeorm';

export class TablesV11703653774066 implements MigrationInterface {
  name = 'TablesV11703653774066';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`address_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`zipCode\` varchar(255) NOT NULL, \`street\` varchar(255) NOT NULL, \`complement\` varchar(255) NULL, \`neighborhood\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`state\` varchar(255) NOT NULL, \`number\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`address_entity\``);
  }
}
