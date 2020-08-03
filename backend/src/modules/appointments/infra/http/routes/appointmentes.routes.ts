import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '@modules/appointments/infra/controllers/AppointmentsController';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

const appointmentsController = new AppointmentsController();
appointmentsRouter.post('/', appointmentsController.create);

// Aplica autenticação em todas as rotas do appointment

// appointmentsRouter.get('/', (request, response) => {
//   const appointments = appointmentsRepository.find();

//   return response.json(appointments);
// });

export default appointmentsRouter;
