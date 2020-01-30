import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent {
    public ingredients: Ingredient[];

    constructor(private _shoppingListService: ShoppingListService) {}

    ngOnInit() {
        this.ingredients = this._shoppingListService.ingredients;
        this._shoppingListService.ingredientsChange.subscribe(
            (ingredientsArray: Ingredient[]) => {
                this.ingredients = ingredientsArray;
            }
        );
    }
}
