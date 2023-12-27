import { AppDataSource } from '../../../shared/typeorm/data-source';
import { AddressEntity } from '../typeorm/entites/address';
import AppError from '../../../shared/errors/AppError';

export default class SHowAddressService {
  async execute(id: number): Promise<AddressEntity> {
    const repository = AppDataSource.getRepository(AddressEntity);
    const address = await repository.findOne({ where: { id } });

    if (!address) throw new AppError('Address not found!', 409);

    return address;
  }
}
