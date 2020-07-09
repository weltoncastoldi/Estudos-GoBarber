import 'reflect-metadata';
import express, { Response, Request, NextFunction } from 'express';
import routes from './routes';
import './database/index';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    // Verifica se existe uma instacia do AppError
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }
    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('Servidor executando localhos:3333');
});
