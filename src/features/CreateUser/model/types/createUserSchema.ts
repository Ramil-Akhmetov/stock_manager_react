export interface CreateUserSchema {
  role: string;
  name: string;
  surname: string;
  patronymic: string;

  email?: string;
  phone: string;
}
