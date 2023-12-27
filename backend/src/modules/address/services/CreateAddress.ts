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

export default class CreateAddressService {
  async execute({
    zipCode,
    street,
    complement,
    city,
    state,
    neighborhood,
    number,
  }: IRequest): Promise<any> {
    const repository = AppDataSource.getRepository(AddressEntity);
    const addressExists = await repository.findOne({
      where: { zipCode },
    });
    if (addressExists) throw new AppError('Address already exists!', 409);
    const address = repository.create({
      zipCode,
      street,
      complement,
      city,
      state,
      number,
      neighborhood,
    });

    await repository.save(address);

    return address;
  }
}
