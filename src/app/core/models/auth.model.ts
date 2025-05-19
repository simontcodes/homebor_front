import { User } from './user.model';

export interface LoginPayload {
  access_token: string;
  user: User;
}
