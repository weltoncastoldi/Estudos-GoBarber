import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// Aplica autenticação em todas as rotas do appointment
appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', (request, response) => {
//   const appointments = appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const pasedDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppointmentService);

  const appointment = await createAppointment.execute({
    date: pasedDate,
    provider_id,
  });

  return response.json(appointment);
});
export default appointmentsRouter;
