import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';

import { Subscription, Observable } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public ingredients: Observable<{ ingredients: Ingredient[] }>;
  private subscription: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit() {
    // NgRx nos suscribe al STATE como un OBSERVABLE y se encarga de manejar su estado
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.ingredients;
    // this.subscription = this.shoppingListService.ingredientsChange.subscribe(
    //   (ingredientsArray: Ingredient[]) => {
    //     this.ingredients = ingredientsArray;
    //   }
    // );
  }

  ngOnDestroy() {
    // OJO, debemos dessuscribirnos del observable generado
    // ya no es necesario porque lo hemos pasado al STATE y NGRX nos realiza la des-suscripción de forma automática
    // this.subscription.unsubscribe();
  }

  public onEditItem(index: number) {
    // PASAMOS LA LÓGICA AL NGRX
    // console.log('edit item: ' + index);
    // this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
