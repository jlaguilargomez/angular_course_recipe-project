import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // la variable determinará el comportamiento de los elementos del Header
  public isAuthenticated = false;
  // creamos una variable subscription para poder "des-suscribirnos al cerrar el componente"
  private userSub: Subscription;

  constructor(
    private _dataStorageService: DataStorageService,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    // si recibimos datos de la suscripción, la variable se volverá TRUE y será como estar navegando con un OK
    this.userSub = this._authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
      console.log(!user);
      console.log(!!user);
      console.log(this.isAuthenticated);
    });
  }

  // muy importante acordarese de cancelar la suscripcion
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  public onSaveData() {
    this._dataStorageService.storeRecipes();
  }

  public onFetchData() {
    this._dataStorageService.fetchRecipes().subscribe();
  }

  public onLogout() {
    this._authService.logout();
  }
}
