import {
    Component,
    ViewChild,
    ElementRef,
    OnInit,
    OnDestroy,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    @ViewChild('myForm', { static: true }) myForm: NgForm;

    subscription: Subscription;
    editMode = false;
    editItemIndex: number;
    editedItem: Ingredient;

    constructor(private shoppingListService: ShoppingListService) {}

    ngOnInit() {
        this.subscription = this.shoppingListService.startedEditing.subscribe(
            (index: number) => {
                this.editItemIndex = index;
                this.editMode = true;
                this.editedItem = this.shoppingListService.getIngredient(index);
                this.myForm.setValue({
                    name: this.editedItem.name,
                    amount: this.editedItem.amount,
                });
                console.log(this.editedItem);
            }
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    public onSubmit(form: NgForm) {
        const value = form.value;
        if (!value.name || !value.amount) {
            console.log('Please, fill the form with all the inputs');
        } else {
            // OJO: convertimos los datos recibidos del formulario a un nuevo ingrediente con la clase "Ingredient"
            const newIngredient: Ingredient = new Ingredient(
                value.name,
                value.amount
            );
            if (this.editMode) {
                this.shoppingListService.updateIngredient(
                    this.editItemIndex,
                    newIngredient
                );
            } else {
                this.shoppingListService.addIngredient(newIngredient);
            }
        }
        form.reset();
        this.editMode = false;
    }

    public onDelete() {
        this.shoppingListService.deleteIngredient(this.editItemIndex);
        this.onClear();
    }

    public onClear() {
        this.myForm.reset();
        this.editMode = false;
    }
}
