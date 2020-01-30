import { Component, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent {
    @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
    @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;

    constructor(private _shoppingListService: ShoppingListService) {}

    private onAddItem() {
        const ingName: string = this.nameInputRef.nativeElement.value;
        const ingAmount: number = this.amountInputRef.nativeElement.value;
        if (!ingName || !ingAmount) {
            console.log('Please, fill the form with all the inputs');
        } else {
            const newIngredient: Ingredient = new Ingredient(
                ingName,
                ingAmount
            );
            this._shoppingListService.addIngredient(newIngredient);
        }
    }

    private onDeleteItem() {
        console.log('item deleted!');
    }

    private onClearItems() {
        this._shoppingListService.clearListOfIngredients();
    }
}
