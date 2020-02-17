import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    public ingredients: Ingredient[];
    private subscription: Subscription;

    constructor(private shoppingListService: ShoppingListService) {}

    ngOnInit() {
        this.ingredients = this.shoppingListService.ingredients;
        this.subscription = this.shoppingListService.ingredientsChange.subscribe(
            (ingredientsArray: Ingredient[]) => {
                this.ingredients = ingredientsArray;
            }
        );
    }

    ngOnDestroy() {
        // OJO, debemos dessuscribirnos del observable generado
        this.subscription.unsubscribe();
    }

    public onEditItem(index: number) {
        console.log('edit item: ' + index);
        this.shoppingListService.startedEditing.next(index);
    }
}
