import { Timestamps } from '../../types/timestamps.ts';

export interface Permission extends Timestamps {
  id: number;
  name: string;
  guard_name: string;
}
