


import CreateAppointmentService from './CreateAppointmentService';
import FakeAppoitmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import AppError from '@shared/errors/AppError';

let fakeAppoitmentRepository: FakeAppoitmentRepository;
let fakeNotificationRepository: FakeNotificationRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointments: CreateAppointmentService;

describe('CreateAppointments', () => {
  beforeEach(() => {
    fakeAppoitmentRepository = new FakeAppoitmentRepository();
    fakeNotificationRepository = new FakeNotificationRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointments = new CreateAppointmentService(
      fakeAppoitmentRepository,
      fakeNotificationRepository,
      fakeCacheProvider
    );
  })
  it('should be able to create a new appoitment' , async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

     const appoitment = await createAppointments.execute({
       date: new Date(2020, 4 , 10 , 13),
       user_id: 'user_id',
      provider_id: 'provider-id',
     });

     expect(appoitment).toHaveProperty('id');
     expect(appoitment.provider_id).toBe('provider-id');
     
  });

  it('should not be able to create two appointments on the same date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 16, 13, 0, 0).getTime();
    });

    const appointmentDate = new Date(2020, 6, 16, 16, 0, 0);

    await createAppointments.execute({
      date: appointmentDate,
      user_id: 'user_id',
      provider_id: 'provider-id',
    });

    await expect(
      createAppointments.execute({
        date: appointmentDate,
        user_id: 'user_id',
        provider_id: 'provider-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date' , async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(createAppointments.execute({
      date: new Date(2020, 4, 10, 11),
      user_id: 'user-id',
      provider_id: 'provider-id',
    })).rejects.toBeInstanceOf(AppError);
  })

  it('should not be able to create an appointment with same user as provider' , async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(createAppointments.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: 'user-id',
      provider_id: 'user-id',
    })).rejects.toBeInstanceOf(AppError);
  })

  it('should not be able to create an appointment before 8am and after 5pm' , async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(createAppointments.execute({
      date: new Date(2020, 4, 11, 7),
      user_id: 'user-id',
      provider_id: 'provider-id',
    })).rejects.toBeInstanceOf(AppError);


    await expect(createAppointments.execute({
      date: new Date(2020, 4, 11, 18),
      user_id: 'user-id',
      provider_id: 'provider-id',
    })).rejects.toBeInstanceOf(AppError);

  })

})