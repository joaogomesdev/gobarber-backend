import 'reflect-metadata';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordToEmailService from './SendForgotPasswordToEmailService';
import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeStrorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUsersTokenRepository';

let fakeUsersRepository:  FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordToEmail: SendForgotPasswordToEmailService;

describe('SendForgotPasswordToEmail', () => {
  beforeEach(()=> {

    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository()
    
    sendForgotPasswordToEmail = new SendForgotPasswordToEmailService(
      fakeUsersRepository, 
      fakeMailProvider, 
      fakeUserTokensRepository
    );

  })
  it('should be able to recover the password using email' , async () => {
   
     const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
     const user = await fakeUsersRepository.create({
       name: 'Jovirone Dale da Silva',
       email: 'jojorone@gmail.com',
       password: '123123'
       
      });
      
     await sendForgotPasswordToEmail.execute({
      email: 'jojorone@gmail.com',
     });

     expect(sendMail).toHaveBeenCalled();
   
     
  });

  it('should not be able to recover a non-existing user password' , async () => {
    await  expect(sendForgotPasswordToEmail.execute({
      email: 'jojorone@gmail.com',
     })).rejects.toBeInstanceOf(AppError);
  
  });

  it('should generate a forgot password token' , async () => {
     const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
     const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

     const user = await fakeUsersRepository.create({
      name: 'Jovirone Dale da Silva',
      email: 'jojorone@gmail.com',
      password: '123123'

     });
     
     await sendForgotPasswordToEmail.execute({
      email: 'jojorone@gmail.com',
     });

     expect(generateToken).toHaveBeenCalledWith(user.id);
  });
  
  


})