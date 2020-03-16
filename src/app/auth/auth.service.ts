import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

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
  // generamos un observable que podrá ser usado por otros componentes, como por ejemplo por el HEADER
  // tslint:disable-next-line: max-line-length
  // cambiamos "Subject" por "BehaviorSubject" para poder acceder a los datos del observable (los previamente almacenados) aunque no se produzcan cambios
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private _http: HttpClient, private _router: Router) {}

  public signUp(userEmail: string, userPassword: string) {
    console.log('signUp!!!');
    return (
      this._http
        .post<AuthRespondData>(
          // vamos a mover la KEY al archivo "environments"
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
            environment.firebaseAPIKey,
          {
            email: userEmail,
            password: userPassword,
            returnSecureToken: true,
          }
        )
        // como vamos a usar este CALLBACK en varios lugares diferentes, lo generamos como un método privado al que llamaremos
        .pipe(
          catchError(this.handleError),
          tap(responseData =>
            this.handleAuthentication(
              responseData.email,
              responseData.localId,
              responseData.idToken,
              +responseData.expiresIn
            )
          )
        )
    );
  }

  public login(userEmail: string, userPassword: string) {
    console.log('login!!!');
    return this._http
      .post<AuthRespondData>(
        // ojo que el ENDPOINT cambia!! (ver docu)
        // vamos a mover la KEY al archivo "environments"
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.firebaseAPIKey,
        {
          email: userEmail,
          password: userPassword,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(responseData =>
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          )
        )
      );
  }

  // este método intentará logearse automáticamente si hay una sesión iniciada al cargar la aplicación
  public autoLogin() {
    // tomamos los datos de la localStorage (si los hubiera) transformados de un STRING a un OBJETO
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpiration: Date;
    } = JSON.parse(localStorage.getItem('userData'));

    // si no tenemos datos, salimos
    if (!userData) {
      return;
    }

    // cargamos los datos del usuario con los datos de la memoria (si los hay)
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpiration)
    );

    // si tenemos token, enviamos los datos del usuario al observable USER para que esté disponible para el resto de la aplicación
    if (loadedUser.token) {
      this.user.next(loadedUser);

      // calculamos el tiempo que va a tardar en caducar nuestro token y lo envimos al método AUTO LOGOUT
      const expirationDuration =
        new Date(userData._tokenExpiration).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  public autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  public logout() {
    // vamos a borrar los datos almacenados en USER para hacer logout
    this.user.next(null);
    // redirigimos a la página de autentificación
    this._router.navigate(['/auth']);
    // borramos los datos del LOCAL STORAGE
    localStorage.removeItem('userData');

    // si tenemos una sesión iniciada, vamos a reiniciar el contador que la mantiene activa
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    // calculamos el tiempo que va a tardar el TOKEN en caducar para introducirlo al generar la instancia
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);

    // emitimos los datos al observable USER
    this.user.next(user);

    // creamos un nuevo usuario ? pues vamos a comenzar la cuenta atrás de su token..., convertido en milisegundos
    this.autoLogout(expiresIn * 1000);

    // guardamos los datos en LOCALSTORAGE del navegador para no perderlos al recargar la aplicación
    localStorage.setItem('userData', JSON.stringify(user));
  }

  // mediante este método nos encargaremos de gestionar los errores que mostraremos al usuario
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
