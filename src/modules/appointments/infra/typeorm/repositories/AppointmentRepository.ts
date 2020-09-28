import { getRepository , Repository , Raw} from 'typeorm'
import IAppoitmentsRepository from '@modules/appointments/repositories/IAppointmentRepository';
import ICreateAppoitmentDTO from '@modules/appointments/dtos/ICreateAppoitmentDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProvider';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProvider';

class AppointmentsRepository  implements IAppoitmentsRepository{

    private ormRepository: Repository<Appointment>;

    constructor() {
      this.ormRepository = getRepository(Appointment);
    }
    public async create({
      provider_id,
      user_id,
      date
    }: ICreateAppoitmentDTO): Promise<Appointment> {
      const appoitment = this.ormRepository.create({
        provider_id,
        user_id,
        date
      });

      await this.ormRepository.save(appoitment);

      return appoitment;
    }

    public async findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>{

        const findAppointment = await this.ormRepository.findOne({
          where: { date , provider_id }
        })

        return findAppointment;
    }

    public async findAllInMonthFromProvider({ provider_id, month, year }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]>{
      const parsedMonth = String(month).padStart(2, '0');
      
      const appoitments = await this.ormRepository.find({
        where: {
          provider_id,
          date: Raw(dateFieldName => 
              `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`
            ),
        },
      })

      

      return appoitments;
  }

  public async findAllInDayFromProvider({ provider_id, day, month, year }: IFindAllInDayFromProviderDTO): Promise<Appointment[]>{
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');
    
    const appoitments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName => 
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`
          ),
      },
      relations: ['user']
    })
    return appoitments;
   
  }
  
    
   
}

export default AppointmentsRepository;