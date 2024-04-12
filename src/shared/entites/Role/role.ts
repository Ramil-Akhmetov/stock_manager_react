import { Timestamps } from '../../types/timestamps.ts';
import { Permission } from '../Permission/permission.ts';

export interface Role extends Timestamps {
  id: number;
  name: string;
  guard_name: string;
  permissions?: Permission[];
}
