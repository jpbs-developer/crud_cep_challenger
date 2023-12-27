import { AppDataSource } from '../../../shared/typeorm/data-source';
import { AddressEntity } from '../typeorm/entites/address';
import AppError from '../../../shared/errors/AppError';

type IRequest = {
  zipCode: string;
  street: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  number: string;
};

export default class UpdateAddressService {
  async execute(
    {
      zipCode,
      street,
      complement,
      city,
      state,
      neighborhood,
      number,
    }: IRequest,
    id: number,
  ): Promise<AddressEntity> {
    const repository = AppDataSource.getRepository(AddressEntity);
    const address = await repository.findOne({ where: { id } });

    if (!address) throw new AppError('Address not found!', 409);
    const addressExists = await repository.findOne({ where: { zipCode } });
    if (addressExists && zipCode !== address.zipCode)
      throw new AppError('Address already exists!', 409);

    address.zipCode = zipCode;
    address.street = street;
    address.neighborhood = neighborhood;
    address.complement = complement;
    address.city = city;
    address.state = state;
    address.number = number;

    await repository.save(address);
    return address;
  }
}
