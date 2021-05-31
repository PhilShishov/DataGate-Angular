import { IBase } from './base';

export interface IUser extends IBase {
  rememberMe: boolean;
  recaptchaValue: string | undefined;
  username: string;
  password: string;
}
