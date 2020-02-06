import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
    providedIn: 'root',
})
export class RecipesService {
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

    get recipes() {
        // mediante slice generamos una copia del array
        return this._recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    constructor(private _shoppingListService: ShoppingListService) {}

    addIngredientToShoppingList(ingredients: Ingredient[]) {
        this._shoppingListService.addIngredients(ingredients);
    }
}
