import { UserPermission, UserRole } from '../consts/userConsts.ts';

export interface User {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  phone: string;
  email: string;
  photo: string;
  email_verified_at?: string;
  extra_attributes: Record<string, string>;
  permissions: UserPermission[];
  roles: UserRole[];
  created_at: string;
  updated_at: string;
}

export interface UserSchema {
  authData?: User;

  _inited: boolean;
}
