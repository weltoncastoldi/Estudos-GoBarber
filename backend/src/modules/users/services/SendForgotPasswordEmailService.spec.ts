// import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
  it('Usuário deve poder recuperar sua senha informando seu e-mail', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendPassword = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    await fakeUsersRepository.create({
      name: 'John Joe',
      email: 'email@email.com.br',
      password: '123456',
    });

    await sendPassword.execute({
      email: 'email@email.com.br',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('Usuário deve poder recuperar sua senha de um usuário não existente', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendPassword = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    await expect(
      sendPassword.execute({
        email: 'email@email.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
