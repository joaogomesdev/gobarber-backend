import User from "../infra/typeorm/entities/User";
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindAllProvidersDTO from "../dtos/IFindAllProvidersDTO";

export default interface IUsersRepositository {
  create(data: ICreateUserDTO ): Promise<User>;
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
  findByEmail(email: String ): Promise<User | undefined>;
  findById(id: String ): Promise<User | undefined>;
  save(user: User): Promise<User>;
}