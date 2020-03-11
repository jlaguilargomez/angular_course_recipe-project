import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private _authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this._authService.user.pipe(
      //  mediante este método nos suscribimos y tomamos los datos 1 sóla vez
      take(1),
      exhaustMap(user => {
        // chequeamos si tenemos usuario creado o no
        if (!user) {
          // si no tenemos usuario, es que nos estamos intentando logear y vamos a mandar una petición sin TOKEN
          return next.handle(req);
        }

        // tslint:disable-next-line: max-line-length
        // si tenemos usuario, es que estamos realizando una petición para solicitar datos, por lo que debemos añadir el TOKEN a la petición mediante el método CLONE del objeto
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
