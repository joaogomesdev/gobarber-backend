import User from '@modules/users/infra/typeorm/entities/User';
import { sign } from 'jsonwebtoken';
import { injectable,inject} from 'tsyringe';


import authConfig from '@config/Auth';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email:string,
  password: string
}
interface IResponse {
  user: User
  token: string,
}

@injectable()
class AuthenticateUserService {

  constructor(
    @inject('UsersRepository')
  private usersRepository: IUsersRepository,

    @inject('HashProvider')
  private IHashProvider: IHashProvider

  ) {}

  public async execute({email, password}: IRequest) : Promise<IResponse>{
      

      const user = await this.usersRepository.findByEmail(email);

      if(!user){
        throw new AppError("Incorrect email/password combination.", 401);
      }

      const passwordMathed = await this.IHashProvider.compareHash(password, user.password );
      
      if(!passwordMathed){
        throw new AppError("Incorrect email/password combination.", 401);
      }

      const { secret, expiresIn } = authConfig.jwt;

      const token = sign({}, secret , {
        subject: user.id,
        expiresIn,
      });
      
      return {
        user,
        token
      }
  }
}

export default AuthenticateUserService;