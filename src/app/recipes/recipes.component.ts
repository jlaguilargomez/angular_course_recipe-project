import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss'],
    providers: [RecipesService],
})
export class RecipesComponent implements OnInit {
    public selectedRecipe: Recipe;

    constructor(private _recipesService: RecipesService) {}

    ngOnInit() {
        this._recipesService.recipeSelected.subscribe((recipe: Recipe) => {
            this.selectedRecipe = recipe;
        });
    }
}
