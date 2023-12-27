import addressRoutes from '../../../modules/address/routes/index';
import { Router } from 'express';



const routes = Router();

routes.use('/address', addressRoutes);

export default routes;
