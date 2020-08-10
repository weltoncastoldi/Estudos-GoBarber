import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to create a new usuario', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'John joe',
      email: 'email@email.com.br',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be able to create a new usuario with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'John joe',
      email: 'email@email.com.br',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'John joe',
        email: 'email@email.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
