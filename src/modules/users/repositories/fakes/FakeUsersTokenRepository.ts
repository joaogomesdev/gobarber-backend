import IUsersTokenRepository from '../IUserTokensRepository';
import { uuid } from 'uuidv4';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';


class FakeUserTokensRepository  implements IUsersTokenRepository{
    private userTokens: UserToken[] = [];
  
    public async  generate(user_id: String ): Promise<UserToken> {
      const userToken = new UserToken();

      Object.assign(userToken, {
        id: uuid(),
        token: uuid(),
        user_id,
        created_at: new Date(),
        updated_at: new Date(),
      });
      
      this.userTokens.push(userToken);

      return userToken;
    } 

    public async findByToken(token: string) : Promise<UserToken | undefined > {
      const userToken = this.userTokens.find(findToken => findToken.token === token);

      return userToken;
    }

    
   



   
}

export default FakeUserTokensRepository;