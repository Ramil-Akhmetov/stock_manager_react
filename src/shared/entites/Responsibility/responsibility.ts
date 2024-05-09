import { ExtraAttributes } from '../../types/extraAttributes.ts';
import { SoftDeletes } from '../../types/softDeletes.ts';
import { Timestamps } from '../../types/timestamps.ts';
import { Room } from '../Room/room.ts';
import { User } from '../User/user.ts';

export interface Responsibility
  extends Timestamps,
    SoftDeletes,
    ExtraAttributes {
  id: number;
  start_date: string;
  end_date: number;
  user_id: number;
  room_id: number;
  user?: User;
  room?: Room;
}
