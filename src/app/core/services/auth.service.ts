import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserDto } from '../dto/createUser.dto';
import { LogInDto } from '../dto/logIn.dto';
import { ApiResponse } from '../types/api-response';
import { LoginData, RegisterData } from '../types/auth-types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  register(user: CreateUserDto) {
    return this.http.post<ApiResponse<RegisterData>>(`${this.baseUrl}/register`, user);
  }

  login(credentials: LogInDto) {
    return this.http.post<ApiResponse<LoginData>>(`${this.baseUrl}/login`, credentials);
  }
}
