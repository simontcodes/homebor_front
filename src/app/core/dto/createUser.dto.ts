type UserRole = 'super' | 'admin' | 'coordinator';

export interface CreateUserDto {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: UserRole;
    date_of_birth: string;
  }