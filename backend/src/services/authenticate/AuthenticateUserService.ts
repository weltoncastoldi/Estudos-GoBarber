import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

interface Request {
  name: string;
  email: string;
  password: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<User> {
    // CRUD do orm pronto parausuario
    const userRepository = getRepository(User);
    const checkUserExiste = await userRepository.findOne({ where: { email } });

    if (checkUserExiste) {
      throw new Error('Email addres already used');
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

export default AuthenticateUserService;
