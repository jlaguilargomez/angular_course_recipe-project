import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { error } from 'protractor';
import { User } from './user.model';

export interface AuthRespondData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject<User>();

  constructor(private _http: HttpClient) {}

  signUp(userEmail: string, userPassword: string) {
    console.log('signUp!!!');
    return (
      this._http
        .post<AuthRespondData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAKEVRqxl3IddIJu7gfzLW1KrAm2HPlvrY',
          {
            email: userEmail,
            password: userPassword,
            returnSecureToken: true,
          }
        )
        // como vamos a usar este CALLBACK en varios lugares diferentes, lo generamos como un método privado al que llamaremos
        .pipe(
          catchError(this.handleError),
          tap(responseData => {
            // generamos una nueva fecha de caducidad
            const expirationDate = new Date(
              new Date().getTime() + +responseData.expiresIn * 1000
            );

            // generamos una instancia de "user" y le pasamos los datos generados
            const user = new User(
              responseData.email,
              responseData.localId,
              responseData.idToken,
              expirationDate
            );

            // enviamos los datos del usuario al Observable almacenado en la variable USER (del mismo servicio)
            this.user.next(user);
          })
        )
    );
  }

  login(userEmail: string, userPassword: string) {
    console.log('login!!!');
    return this._http
      .post<AuthRespondData>(
        // ojo que el ENDPOINT cambia!! (ver docu)
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAKEVRqxl3IddIJu7gfzLW1KrAm2HPlvrY',
        {
          email: userEmail,
          password: userPassword,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknow error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no users with that email';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Wrong password';
        break;
    }
    return throwError(errorMessage);
  }
}
