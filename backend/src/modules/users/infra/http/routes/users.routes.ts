import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UserController from '@modules/users/infra/controllers/UsersController';
import UserAvatarController from '@modules/users/infra/controllers/UserAvatarController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const userController = new UserController();
const userAvatarController = new UserAvatarController();

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', userController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);
export default usersRouter;
