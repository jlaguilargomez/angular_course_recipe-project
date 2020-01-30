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

    onAddItem() {
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
            console.log('btn add clicked!' + ingName + ingAmount);
        }
    }

    onDeleteItem() {
        console.log('item deleted!');
    }

    onClearItem() {
        console.log('item cleared!');
    }
}
