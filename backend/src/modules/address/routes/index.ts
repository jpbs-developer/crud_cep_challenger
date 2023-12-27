import { Router } from 'express';
import AddressController from '../controllers/AddressController';

const addressRoutes = Router();

addressRoutes
  .get('/', AddressController.index)
  .post('/', AddressController.create);

addressRoutes
  .get('/:id', AddressController.show)
  .put('/:id', AddressController.update)
  .delete('/:id', AddressController.delete);

export default addressRoutes;
