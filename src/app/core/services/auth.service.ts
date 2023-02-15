import { Injectable } from '@angular/core';
import { LoginInput, LoginResult, RegisterInput } from '../models/auth';
import { HttpService } from './http.service';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { ToastService } from 'angular-toastify';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private htpp: HttpService,
    private router: Router,
    private toast: ToastService
  ) {}

  saveToken(token: string | null) {
    if (token) sessionStorage.setItem('accessToken', token);
  }

  getToken() {
    return sessionStorage.getItem('accessToken');
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  logIn(loginInput: LoginInput): Observable<LoginResult> {
    return this.htpp.post<LoginResult>(`/auth/login`, loginInput).pipe(
      map((res: LoginResult) => {
        this.router.navigate(['home']);
        return res;
      }),
      catchError(err => {
        return this.handleLoginError(err);
      })
    );
  }

  register(registerInput: RegisterInput): Observable<any> {
    return this.htpp.post<User>('/users', registerInput).pipe(
      map((res: User) => {
        return res;
      }),
      catchError(err => {
        return this.handleRegisterError(err);
      })
    );
  }

  private handleRegisterError(err: HttpErrorResponse): Observable<never> {
    console.log(err.error.error);
    if (err.error.error.split(' ')[0] === 'Duplicate') {
      return throwError(() => new Error('El correo ingresado ya esta registrado'));
    }
    return throwError(() => new Error('Ha ocurrido un error al intentar crear el usuario'));
  }

  private handleLoginError(err: HttpErrorResponse): Observable<never> {
    if (err.status == 401) {
      return throwError(() => new Error('Usuario o contraseña incorrecta'));
    }
    return throwError(() => new Error('Ha ocurrido un error'));
  }
}
