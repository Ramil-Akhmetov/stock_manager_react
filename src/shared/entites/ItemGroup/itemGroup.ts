import { ExtraAttributes } from '../../types/extraAttributes.ts';
import { SoftDeletes } from '../../types/softDeletes.ts';
import { Timestamps } from '../../types/timestamps.ts';

export interface ItemGroup extends Timestamps, SoftDeletes, ExtraAttributes {
  id: number;
  name: string;
}
