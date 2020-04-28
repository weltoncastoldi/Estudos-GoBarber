import { Router } from 'express';
import appointmentsRouter from './appointmentes.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);

export default routes;
