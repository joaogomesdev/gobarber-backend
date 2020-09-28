import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IAppoitmentsRepository from '../repositories/IAppointmentRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Appointment from '../infra/typeorm/entities/Appointment';
import { classToClass } from 'class-transformer';




interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}


@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository') 
    private appoitmentsRepository: IAppoitmentsRepository,
   
    @inject('CacheProvider') 
    private cacheProvider: ICacheProvider,
    ) {}
 
  public async execute({provider_id, day, month , year}: IRequest): Promise<Appointment[]>{
      const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;

      // let appointments = await this.cacheProvider.recover<Appointment[]>(
      //   cacheKey
      //   );
      // console.log(cacheData);
      let appointments = null; 
      if(!appointments) {
         appointments = await this.appoitmentsRepository.findAllInDayFromProvider(
          {
          provider_id,
          day,
          month,
          year
         }
        );
        
        await this.cacheProvider.save(cacheKey, classToClass(appointments) );


      }

     
      
     

      return appointments;
  }
}

export default ListProviderAppointmentsService;