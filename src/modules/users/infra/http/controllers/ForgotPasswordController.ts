import { Request , Response } from 'express';
import { container } from 'tsyringe';
import SendForgotPasswordToEmailService from '@modules/users/services/SendForgotPasswordToEmailService';

export default class ForgotPasswordController{
  
  
  public async create(request: Request, response: Response) : Promise<Response>{


  const { email , password } = request.body;
  
  
  const sendForgotPasswordToEmail = container.resolve(SendForgotPasswordToEmailService);

  await sendForgotPasswordToEmail.execute({
    email,
  });
   
  return response.status(204).json();



}

}