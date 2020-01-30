import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
    providedIn: 'root',
})
export class RecipesService {
    public recipeSelected = new EventEmitter<Recipe>();

    private _recipes: Recipe[] = [
        new Recipe(
            'A test recipe',
            'This is a test',
            'https://cdn.pixabay.com/photo/2017/03/26/11/53/food-platter-2175326_960_720.jpg'
        ),
        new Recipe(
            'Cosa',
            'Güena',
            'https://cdn.pixabay.com/photo/2016/12/26/17/28/food-1932466__340.jpg'
        ),
    ];

    get recipes() {
        return this._recipes.slice();
    }

    constructor() {}
}
