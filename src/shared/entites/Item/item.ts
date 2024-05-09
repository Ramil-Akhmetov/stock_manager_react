import { ExtraAttributes } from '../../types/extraAttributes.ts';
import { SoftDeletes } from '../../types/softDeletes.ts';
import { Timestamps } from '../../types/timestamps.ts';
import { Category } from '../Category/category.ts';
import { ItemGroup } from '../ItemGroup/itemGroup.ts';
import { ItemType } from '../ItemType/itemType.ts';
import { Room } from '../Room/room.ts';

export interface Item extends Timestamps, ExtraAttributes, SoftDeletes {
  id: number;
  code: string;
  name: string;
  quantity?: number;
  unit?: string;
  photo?: string;
  category_id?: number;
  type_id?: number;
  group_id?: number;
  room_id: number;

  category?: Category;
  type?: ItemType;
  group?: ItemGroup;
  room?: Room;
}
