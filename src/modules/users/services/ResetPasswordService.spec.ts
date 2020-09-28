import 'reflect-metadata';

import ResetPasswordService from './ResetPasswordService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';


import FakeUserTokensRepository from '../repositories/fakes/FakeUsersTokenRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';


let fakeUsersRepository:  FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(()=> {

    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository()
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository, 
      fakeHashProvider,
      fakeUserTokensRepository,
    );

  });

  it('should be able to reset the password' , async () => {
   
     const user = await fakeUsersRepository.create({
       name: 'Jovirone Dale da Silva',
       email: 'jojorone@gmail.com',
       password: '123123'
       
      });

     const { token } =  await fakeUserTokensRepository.generate(user.id);
      
     const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

     await resetPassword.execute({
      password: '123456',
      token
     });

     const updatedUser = await fakeUsersRepository.findById(user.id);

     expect(generateHash).toHaveBeenCalledWith('123456');
     expect(updatedUser?.password).toBe('123456');
   
     
  });

  it('should not be able to reset the password if pass more than 2 hours' ,async () => { 

    const user = await fakeUsersRepository.create({
      name: 'Jovirone Dale da Silva',
      email: 'jojorone@gmail.com',
      password: '123123'
      
     });

     
    const { token } =  await fakeUserTokensRepository.generate(user.id);
     
     jest.spyOn(Date, 'now').mockImplementationOnce(() => {
        const customDate = new Date();

        return customDate.setHours(customDate.getHours() + 3);
     })

    await expect(
      resetPassword.execute({
     password: '123456',
     token
    })).rejects.toBeInstanceOf(AppError);

    

  });

  it('should not be able to reset the password with non-existing token' ,async () => { 

    await expect(
      resetPassword.execute({
        token: 'non-existing-token',
        password: '123123'
      })
    ).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to reset the password with non-existing user' ,async () => { 

    const { token }  = await fakeUserTokensRepository.generate('non-existing-user');

    await expect(
      resetPassword.execute({
        token,
        password: '123123'
      })
    ).rejects.toBeInstanceOf(AppError);
    
  });

 
  

  
  


})