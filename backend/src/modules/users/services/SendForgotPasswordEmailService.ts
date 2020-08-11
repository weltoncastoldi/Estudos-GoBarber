import { injectable, inject } from 'tsyringe';
// import AppError from '@shared/errors/AppError';
// import User from '@modules/users/infra/typeorm/entities/User';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const checkUserExist = await this.usersRepository.findByEmail(email);
    if (!checkUserExist) {
      throw new AppError('User não existe');
    }
    this.mailProvider.sendMail(
      email,
      'Pedido de recuperaçção de senha recebido',
    );
  }
}

export default SendForgotPasswordEmailService;
