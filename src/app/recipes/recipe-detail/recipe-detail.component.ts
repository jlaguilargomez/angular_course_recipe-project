import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
    @Input() recipe: Recipe;

    constructor(private _recipesService: RecipesService) {}

    ngOnInit() {}

    onAddToShoppingList() {
        this._recipesService.addIngredientToShoppingList(
            this.recipe.ingredients
        );
    }
}
