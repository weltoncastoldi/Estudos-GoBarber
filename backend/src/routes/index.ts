import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
  response.json({ message: 'hello welton' });
});

export default routes;
