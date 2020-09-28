import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import { classToClass } from 'class-transformer';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year, day } = request.query;
    const provider_id = request.user.id;

    const listProvidersAppointments = container.resolve(
      ListProviderAppointmentsService
    );

    const appointments = await listProvidersAppointments.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
      day: Number(day),
    });

    return response.json(classToClass(appointments));
  }
}