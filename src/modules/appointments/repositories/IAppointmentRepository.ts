import Appoitment from '@modules/appointments/infra/typeorm/entities/Appointment';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppoitmentDTO from '../dtos/ICreateAppoitmentDTO';
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProvider';
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProvider';

export default interface IAppoitmentsRepository {
  create(data: ICreateAppoitmentDTO): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appoitment | undefined>;
  findAllInMonthFromProvider(data: IFindAllInMonthFromProviderDTO): Promise<Appointment[]>;
  findAllInDayFromProvider(data: IFindAllInDayFromProviderDTO): Promise<Appointment[]>;
}