import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ShoppingListService {
    // OJO, generamos un "subject" al que suscribirnos en lugar de un EventEmmiter()
    private _ingredientsChange = new Subject<Ingredient[]>();
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

    public addIngredient(ingredient: Ingredient) {
        this._ingredients.push(ingredient);
        this._ingredientsChange.next(this.ingredients.slice());
    }

    public addIngredients(ingredients: Ingredient[]) {
        this._ingredients.push(...ingredients);
        this._ingredientsChange.next(this.ingredients.slice());
    }

    public clearListOfIngredients() {
        this._ingredients = [];
        this._ingredientsChange.next([]);
    }
}
