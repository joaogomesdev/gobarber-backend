import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ListProvidersService from './ListProvidersService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';


let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProvidersService(
      fakeUsersRepository, 
      fakeCacheProvider
      );
  })

  it('should be able to list the providers' , async () => {
  
    const user1 = await fakeUsersRepository.create({
      name: 'JoJo',
      email: 'jojo@gmail.com',
      password: '123123'
     });

     const user2 = await fakeUsersRepository.create({
      name: 'JoJo Rabbit',
      email: 'jojorabbit@gmail.com',
      password: '123123'
     });

     const loggedUser = await fakeUsersRepository.create({
      name: 'JoJo Logged',
      email: 'jojologged@gmail.com',
      password: '123123'
     });
   
     const providers = await listProviders.execute({
      user_id: loggedUser.id,
     });

     expect(providers).toEqual([
      user1,
      user2
     ]);
  
  
  });

  it('should be not able to show the profile from non-existing user' , async () => {
  
     expect(listProviders.execute({
      user_id: 'non-existing-user-id',
     })).rejects.toBeInstanceOf(AppError);
    
  });



})