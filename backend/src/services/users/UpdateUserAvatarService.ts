import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../../models/User';
import uploadConfig from '../../config/upload';
import AppError from '../../errors/AppError';

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(user_id);
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
    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
