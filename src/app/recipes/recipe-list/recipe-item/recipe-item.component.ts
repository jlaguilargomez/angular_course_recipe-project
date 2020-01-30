import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';

@Component({
    selector: 'app-recipe-item',
    templateUrl: './recipe-item.component.html',
    styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent implements OnInit {
    @Input() public recipe: Recipe;

    constructor(private _recipesService: RecipesService) {}

    ngOnInit() {}

    onSelected() {
        this._recipesService.recipeSelected.emit(this.recipe);
    }
}
