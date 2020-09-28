import 'reflect-metadata';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider ,fakeCacheProvider );
 })

  it('should be able to create a new user' , async () => {
     const user = await createUser.execute({
      name: 'Jovirone Dale da Silva',
      email: 'jojorone@gmail.com',
      password: '123123'
     });

     expect(user).toHaveProperty('id');
   
     
  });

  it('should be able to create a new user with same email from another ' , async () => {
    

  await createUser.execute({
     name: 'Jovirone Dale da Silva',
     email: 'jojorone@gmail.com',
     password: '123123'
    });

    expect(createUser.execute({
      name: 'Jovirone Dale da Silva',
      email: 'jojorone@gmail.com',
      password: '123123'
     })).rejects.toBeInstanceOf(AppError);

    
  
    
 });

})