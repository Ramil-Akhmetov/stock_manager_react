import { User } from '@/shared/entites/User/user.ts';

export interface UserSchema {
  authData?: User;

  _inited: boolean;
}
