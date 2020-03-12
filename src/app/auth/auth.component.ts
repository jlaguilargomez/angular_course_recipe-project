import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthRespondData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public isLoginMode = true;
  public isLoading = false;
  public error: string = null;

  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit() {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    // prevenimos que el usuario lance el método si consigue activar el botón
    this.error = null;

    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthRespondData>;

    this.isLoading = true;

    // verificamos si estamos o no en modo "login"
    if (this.isLoginMode) {
      authObs = this._authService.login(email, password);
    } else {
      authObs = this._authService.signUp(email, password);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this._router.navigate(['/recipes']);
      },
      errorMessage => {
        this.isLoading = false;
        this.error = errorMessage;
      }
    );
    form.reset();
  }

  onHandleError() {
    this.error = null;
  }
}
