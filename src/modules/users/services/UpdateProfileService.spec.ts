import 'reflect-metadata';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';
import ShowProfileService from './ShowProfileService';


let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;


describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);
  })

  it('should be able to update the profile' , async () => {
  
    const user = await fakeUsersRepository.create({
      name: 'Jovirone Dale da Silva',
      email: 'jojorone@gmail.com',
      password: '123123'
     });
 
     const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'JoJo Nuts',
      email: 'jojonuts@gmail.com',
     });
 
     expect(updatedUser.name).toBe('JoJo Nuts');
     expect(updatedUser.email).toBe('jojonuts@gmail.com');


     
  });

  it('should be not able to update the profile from non-existing user' , async () => {
  
    expect(updateProfile.execute({
     user_id: 'non-existing-user-id',
     name: 'Test',
     email: 'test@example.com'
    })).rejects.toBeInstanceOf(AppError);
   
 });

  it('should not be able to change to another user email' , async () => {
  
    await fakeUsersRepository.create({
      name: 'Jovirone Dale da Silva',
      email: 'jojorone@gmail.com',
      password: '123123'
     });

     const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@example.com',
      password: '123123'
     });

     await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Jovirone Dale da Silva',
      email: 'jojorone@gmail.com',
     })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password' , async () => {
    
    const user = await fakeUsersRepository.create({
      name: 'Jovirone Dale da Silva',
      email: 'jojorone@gmail.com',
      password: '123123'
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'JoJo Nuts',
      email: 'jojonuts@gmail.com',
      old_password: '123123',
      password: '123456'
    });

    expect(updatedUser.password).toBe('123456');
  
  });

  it('should not be able to update the password without informing the old password' , async () => {
    
    const user = await fakeUsersRepository.create({
      name: 'Jovirone Dale da Silva',
      email: 'jojorone@gmail.com',
      password: '123123'
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'JoJo Nuts',
      email: 'jojonuts@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to update the password with wrong old password' , async () => {
    
    const user = await fakeUsersRepository.create({
      name: 'Jovirone Dale da Silva',
      email: 'jojorone@gmail.com',
      password: '123123'
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'JoJo Nuts',
      email: 'jojonuts@gmail.com',
      old_password: 'wrong-old-password',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);

  });


 


})