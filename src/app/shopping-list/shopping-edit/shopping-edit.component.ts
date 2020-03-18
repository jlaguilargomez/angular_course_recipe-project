import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('myForm', { static: true }) myForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe(stateData => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.myForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        } else {
          this.editMode = false;
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  public onSubmit(form: NgForm) {
    const value = form.value;
    if (!value.name || !value.amount) {
      console.log('Please, fill the form with all the inputs');
    } else {
      // OJO: convertimos los datos recibidos del formulario a un nuevo ingrediente con la clase "Ingredient"
      const newIngredient: Ingredient = new Ingredient(
        value.name,
        value.amount
      );
      if (this.editMode) {
        // PASAMOS LA LÓGICA AL STORE DE NGRX
        // this.shoppingListService.updateIngredient(
        //   this.editItemIndex,
        //   newIngredient
        // );
        this.store.dispatch(
          new ShoppingListActions.UpdateIngredient(newIngredient)
        );
      } else {
        // this.shoppingListService.addIngredient(newIngredient);
        this.store.dispatch(
          new ShoppingListActions.AddIngredient(newIngredient)
        );
      }
    }
    form.reset();
    this.editMode = false;
  }

  public onDelete() {
    // PASAMOS LA LÓGICA AL STORE DE NGRX
    // this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  public onClear() {
    this.myForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
