import { ExtraAttributes } from '../../types/extraAttributes.ts';
import { Timestamps } from '../../types/timestamps.ts';
import { Role } from '../Role/role.ts';

export interface User extends Timestamps, ExtraAttributes {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  phone?: string;
  email?: string;
  photo?: string;
  email_verified_at?: string;

  permissions: Permissions[];
  roles: Role[];
}
