import { Role } from '../models/role.model';
import { ApiResponse } from './api-response';

export interface UserDto {
  id: string;
  email: string;
  role: Role;
  tenant: { id: string; name: string; slug: string } | null;
}

export interface LoginData {
  access_token: string;
  user: UserDto;
}

export interface RegisterData {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: Role;
    date_of_birth: string;
  }


export type LoginResponse = ApiResponse<LoginData>;
