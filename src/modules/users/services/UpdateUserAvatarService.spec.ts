import 'reflect-metadata';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeStrorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';


let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStrorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStrorageProvider();
    updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);
  })
  it('should be able to update user avatar' , async () => {
  
     const user = await fakeUsersRepository.create({
      name: 'Jovirone Dale da Silva',
      email: 'jojorone@gmail.com',
      password: '123123'
     });

     await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
     });

     expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update av avatar from non existing user' , async () => {
     await expect(updateUserAvatar.execute({
      user_id: 'non-existing-user',
      avatarFilename: 'avatar.jpg'
     })).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one' , async () => {

    const deleteFile = jest.spyOn(fakeStorageProvider , 'deleteFile');

     const user = await fakeUsersRepository.create({
      name: 'Jovirone Dale da Silva',
      email: 'jojorone@gmail.com',
      password: '123123'
     });

     await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
     });

     await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg'
     });


     expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
     expect(user.avatar).toBe('avatar2.jpg');
  });



})