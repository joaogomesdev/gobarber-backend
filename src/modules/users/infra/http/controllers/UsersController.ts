import { Request , Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import CreateUserService from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';

export default class UsersController{
  
  
  public async create(request : Request, response:Response)  {

    const { name, email, password } = request.body;
    
    
    const createUser = container.resolve(CreateUserService);
  
    const user = await createUser.execute({
      name,
      email,
      password,
    })
    delete user.password;
  
    return response.json(classToClass(user));
   
  }

  public async update(request : Request, response:Response){
    console.log(request.file);
    try {
     
      const updateUserAvatar = container.resolve(UpdateUserAvatarService)
  
      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });
      delete user.password;
      return response.json(classToClass(user));
  
    } catch (err) {
      return response.status(400).json({error: err.message});
    }
  }

 

}

