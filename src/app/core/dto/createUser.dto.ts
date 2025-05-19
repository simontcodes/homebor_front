import { UserRole } from '../enums/user-roles.enum';

export interface CreateUserDto {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: UserRole;
    date_of_birth: string;
  }