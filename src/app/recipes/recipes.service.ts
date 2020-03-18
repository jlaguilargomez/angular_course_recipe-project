import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  public recipesChanged = new Subject<Recipe[]>();

  // LO HEMOS LLEVADO AL STATE!!
  // public recipes: Recipe[] = [
  //   new Recipe(
  //     'A test recipe',
  //     'This is a test',
  //     'https://cdn.pixabay.com/photo/2017/03/26/11/53/food-platter-2175326_960_720.jpg',
  //     [
  //       new Ingredient('lechuga', 1),
  //       new Ingredient('puerro', 11),
  //       new Ingredient('platano', 4),
  //     ]
  //   ),
  //   new Recipe(
  //     'Cosa',
  //     'Güena',
  //     'https://cdn.pixabay.com/photo/2016/12/26/17/28/food-1932466__340.jpg',
  //     [
  //       new Ingredient('jamon', 2),
  //       new Ingredient('tocino', 3),
  //       new Ingredient('panceta', 23),
  //     ]
  //   ),
  // ];
  public recipes: Recipe[] = [];

  constructor(
    private _shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  public getRecipes() {
    // mediante slice generamos una copia del array
    return this.recipes.slice();
  }

  public getRecipe(index: number) {
    return this.recipes[index];
  }

  public addIngredientToShoppingList(ingredients: Ingredient[]) {
    // manejamos los datos en el STORE, así que cada vez que adjuntamos nuevos ingredientes, actualizamos el ESTADO de la app
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  public addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  public updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  public deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  public setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
