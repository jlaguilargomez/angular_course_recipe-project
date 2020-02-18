import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  public recipesChanged = new Subject<Recipe[]>();
  private _recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'This is a test',
      'https://cdn.pixabay.com/photo/2017/03/26/11/53/food-platter-2175326_960_720.jpg',
      [
        new Ingredient('lechuga', 1),
        new Ingredient('puerro', 11),
        new Ingredient('platano', 4),
      ]
    ),
    new Recipe(
      'Cosa',
      'Güena',
      'https://cdn.pixabay.com/photo/2016/12/26/17/28/food-1932466__340.jpg',
      [
        new Ingredient('jamon', 2),
        new Ingredient('tocino', 3),
        new Ingredient('panceta', 23),
      ]
    ),
  ];

  constructor(private _shoppingListService: ShoppingListService) {}

  public get recipes() {
    // mediante slice generamos una copia del array
    return this._recipes.slice();
  }

  public getRecipe(index: number) {
    return this.recipes[index];
  }

  public addIngredientToShoppingList(ingredients: Ingredient[]) {
    this._shoppingListService.addIngredients(ingredients);
  }

  public addRecipe(recipe: Recipe) {
    this._recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  public updateRecipe(index: number, newRecipe: Recipe) {
    this._recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  public deleteRecipe(index: number) {
    this._recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
