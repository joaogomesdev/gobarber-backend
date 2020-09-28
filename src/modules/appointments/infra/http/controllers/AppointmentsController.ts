import { Request , Response } from 'express';

import Appointment from "../../typeorm/entities/Appointment";
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { parseISO } from 'date-fns';

export default class AppointmentsController {

  public async create(request:  Request , response: Response): Promise<Response> {
    const loggedUserId = request.user.id;

    const { provider_id , date} = request.body;
    
    
  
    const createAppointment = container.resolve(CreateAppointmentService);
  
    const appointment = await createAppointment.execute({provider_id, user_id: loggedUserId , date})
  
      return response.json(appointment);
  
  
  }
}