import { User } from '@/entities/User';
import { ExtraAttributes } from '../../types/extraAttributes.ts';
import { SoftDeletes } from '../../types/softDeletes.ts';
import { Timestamps } from '../../types/timestamps.ts';

export interface Room extends Timestamps, SoftDeletes, ExtraAttributes {
  id: number;
  name: string;
  number: number;
  user_id: number;
  room_id: number;
  user?: User;
}
