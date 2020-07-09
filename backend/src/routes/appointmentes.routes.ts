import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/appointments/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// Aplica autenticação em todas as rotas do appointment
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const pasedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();
  const appointment = await createAppointment.execute({
    date: pasedDate,
    provider_id,
  });

  return response.json(appointment);
});
export default appointmentsRouter;
