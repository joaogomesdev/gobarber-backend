
import { Entity , Column ,PrimaryGeneratedColumn , CreateDateColumn , UpdateDateColumn, ManyToMany, ManyToOne , JoinColumn, ObjectID, ObjectIdColumn} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';


@Entity('notifications')
class Notification {

  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  content: string;

  @Column('uuid')
  recipient_id: string;

  @Column( {default: false} )
  read: boolean;

  @CreateDateColumn()
  created_at: Date;
  
  @UpdateDateColumn()
  updated_at: Date;

}

export default Notification;