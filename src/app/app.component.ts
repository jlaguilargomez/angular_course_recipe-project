import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private _authService: AuthService) {}

  ngOnInit() {
    // usamos el método AUTO LOGIN para ver si tenemos datos en la LOCAL STORAGE
    this._authService.autoLogin();
  }
}
