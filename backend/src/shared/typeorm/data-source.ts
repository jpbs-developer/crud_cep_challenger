import { AddressEntity } from '../../modules/address/typeorm/entites/address';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'db',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'cep_db',
  synchronize: true,
  entities: [AddressEntity],
  migrations: ['src/shared/typeorm/migrations/*.{js, ts}'],
});
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch(err => {
    console.error('Error during Data Source initialization', err);
  });
