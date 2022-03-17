import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';

class NotificationsRepository  implements INotificationRepository{

    private ormRepository: MongoRepository<Notification>;

    constructor() {
      this.ormRepository = getMongoRepository( Notification , 'mongodb');
    }
    public async create({
     content,
     recipient_id
    }: ICreateNotificationDTO): Promise<Notification> {

      const notification = this.ormRepository.create({
        content,
        recipient_id
      });

      await this.ormRepository.save(notification);

      return notification;
    }

   
}

export default NotificationsRepository;