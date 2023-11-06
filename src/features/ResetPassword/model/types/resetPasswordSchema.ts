export interface ResetPasswordSchema {
  old_password: string;
  new_password: string;
  new_password_confirmation: string;
}
