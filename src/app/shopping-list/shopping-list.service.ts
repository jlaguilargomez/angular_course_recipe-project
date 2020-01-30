import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
    providedIn: 'root',
})
export class ShoppingListService {
    private _ingredientsChange = new EventEmitter<Ingredient[]>();
    private _ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    constructor() {}

    get ingredients() {
        return this._ingredients.slice();
    }

    get ingredientsChange() {
        return this._ingredientsChange;
    }

    addIngredient(ingredient: Ingredient) {
        this._ingredients.push(ingredient);
        this._ingredientsChange.emit(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        this._ingredients.push(...ingredients);
        this._ingredientsChange.emit(this.ingredients.slice());
    }
}
