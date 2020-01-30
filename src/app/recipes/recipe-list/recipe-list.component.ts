import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
    public recipes: Recipe[];

    constructor(private _recipesServices: RecipesService) {}

    ngOnInit() {
        this.recipes = this._recipesServices.recipes;
    }
}
