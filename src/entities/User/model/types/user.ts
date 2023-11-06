export interface User {
  id: string;
  name: string;
  surname: string;
  patronymic: string;
  phone: string;
  email: string;
  photo: string;
  extra_attributes: Record<string, string>;
}

export interface UserSchema {
  authData?: User;

  _inited: boolean;
}
