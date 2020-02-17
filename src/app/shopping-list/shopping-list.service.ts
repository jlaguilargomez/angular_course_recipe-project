import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ShoppingListService {
    // OJO, generamos un "subject" al que suscribirnos en lugar de un EventEmmiter()
    public ingredientsChange = new Subject<Ingredient[]>();
    public startedEditing = new Subject<number>();
    public ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    constructor() {}

    public addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChange.next(this.ingredients.slice());
    }

    public addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChange.next(this.ingredients.slice());
    }

    public clearListOfIngredients() {
        this.ingredients = [];
        this.ingredientsChange.next([]);
    }

    public getIngredient(index: number) {
        return this.ingredients[index];
    }

    public updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChange.next(this.ingredients.slice());
    }

    public deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChange.next(this.ingredients.slice());
    }
}
