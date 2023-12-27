import { Request, Response } from 'express';
import ListAddressService from '../services/ListAddress';
import CreateAddressService from '../services/CreateAddress';
import UpdateAddressService from '../services/UpdateAddress';
import DeleteAddressService from '../services/DeleteAddress';
import SHowAddressService from '../services/ShowAddress';

export class AddressController {
  async show(request: Request, response: Response) {
    const service = new SHowAddressService();
    const { id } = request.params;
    const address = await service.execute(+id);
    return response.status(200).json(address);
  }

  async index(request: Request, response: Response) {
    const service = new ListAddressService();
    const address = await service.execute();
    return response.status(200).json(address);
  }

  async create(request: Request, response: Response) {
    const service = new CreateAddressService();
    const address = await service.execute(request.body);
    return response.status(200).json({ address });
  }

  async update(request: Request, response: Response) {
    const service = new UpdateAddressService();
    const { id } = request.params;
    const address = await service.execute(request.body, +id);
    return response.status(200).json({ address });
  }

  async delete(request: Request, response: Response) {
    const service = new DeleteAddressService();
    const { id } = request.params;
    await service.execute(+id);
    return response
      .status(200)
      .json({ message: 'Address deleted successfully! ' });
  }
}

export default new AddressController();
