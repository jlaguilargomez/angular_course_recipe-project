import { Injectable } from '@angular/core';

import { map, tap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private _http: HttpClient,
    private _recipeService: RecipesService
  ) {}

  storeRecipes() {
    const recipes = this._recipeService.recipes;

    return this._http
      .put(
        'https://recipe-project-backend.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return (
      this._http
        // OJO: por defecto se entiende que nos devolveran un objeto, tenemos que especificar que en este caso no es así
        .get<Recipe[]>(
          'https://recipe-project-backend.firebaseio.com/recipes.json'
        )
        .pipe(
          map(recipes => {
            return recipes.map(recipe => {
              return {
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : [],
              };
            });
          }),
          tap(recipes => {
            this._recipeService.setRecipes(recipes);
          })
        )
    );
  }
}
