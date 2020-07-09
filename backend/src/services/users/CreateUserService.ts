import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../../models/User';
import AppError from '../../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    // CRUD do orm pronto parausuario
    const userRepository = getRepository(User);
    const checkUserExiste = await userRepository.findOne({ where: { email } });

    if (checkUserExiste) {
      throw new AppError('Email addres already used');
    }

    const hashedPassword = await hash(password, 8);
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);
    return user;
  }
}

export default CreateUserService;
