import { AppDataSource } from '../../../shared/typeorm/data-source';
import { AddressEntity } from '../typeorm/entites/address';

export default class ListAddressService {
  async execute(): Promise<AddressEntity[]> {
    const repository = AppDataSource.getRepository(AddressEntity);
    const address = await repository.find();

    return address;
  }
}
