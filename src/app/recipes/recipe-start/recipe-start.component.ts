import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.scss'],
})
export class RecipeStartComponent implements OnInit {
  constructor(private _authService: AuthService) {}

  ngOnInit() {
    // devuelve el estado del usuario con su TOKEN
    this._authService.user.subscribe(data => console.log(data));
  }
}
