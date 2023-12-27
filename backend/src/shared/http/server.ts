import 'reflect-metadata';
import 'express-async-errors';
import '../typeorm/data-source';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import AppError from '../errors/AppError';
import routes from './routes';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ status: 'error', message: error.message });
  }
  return res
    .status(500)
    .json({ status: 'error', message: 'Internal Server Error' });
});
app.listen(PORT, () => console.log('Server listening on port ' + PORT));
