import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('only authenticated users can chage avatar', 401);
    }

    if (user.avatar) {
      // Deletar avatar anterior
      const userAvataFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExist = await fs.promises.stat(userAvataFilePath);

      if (userAvatarFileExist) {
        await fs.promises.unlink(userAvataFilePath);
      }
    }

    user.avatar = avatarFileName;
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
