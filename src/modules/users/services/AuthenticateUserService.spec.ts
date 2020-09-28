import 'reflect-metadata';

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
     fakeUsersRepository = new FakeUsersRepository();
     fakeHashProvider = new FakeHashProvider();
     authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
  })

  it('should be able to authenticate' , async () => {
    
     const user = await fakeUsersRepository.create({
      name: 'Jovirone Dale da Silva',
      email: 'jojorone@gmail.com',
      password: '123123'
     });

     const response = await authenticateUser.execute({
      email: 'jojorone@gmail.com',
      password: '123123'
     })

     expect(response).toHaveProperty('token');
     expect(response.user).toEqual(user);
   
     
  });

  it('should not be able to authenticate with non existing user' , async () => {
     expect(authenticateUser.execute({
      email: 'jojorone@gmail.com',
      password: '123123'
     })).rejects.toBeInstanceOf(AppError);
  });

  it('should not to be able to authenticate with wrong password' , async () => {
   const user = await fakeUsersRepository.create({
      name: 'Jovirone Dale da Silva',
      email: 'jojorone@gmail.com',
      password: '123123'
     });

 

     expect(authenticateUser.execute({
      email: 'jojorone@gmail.com',
      password: 'wrongPassword'
     })).rejects.toBeInstanceOf(AppError);
    
   
     
  });

})