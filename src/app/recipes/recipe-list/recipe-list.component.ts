import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
    public recipes: Recipe[];

    @Output() recipeWasSelected = new EventEmitter<Recipe>();

    constructor(private _recipesServices: RecipesService) {}

    ngOnInit() {
        this.recipes = this._recipesServices.recipes;
    }

    onRecipeSelected(recipe: Recipe) {
        this.recipeWasSelected.emit(recipe);
        console.log('recipe-list gets data!' + recipe);
    }
}
