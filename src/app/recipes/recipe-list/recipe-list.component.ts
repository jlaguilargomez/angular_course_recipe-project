import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
    @Output() recipeWasSelected = new EventEmitter<Recipe>();

    public recipes: Recipe[] = [
        new Recipe(
            'A test recipe',
            'This is a test',
            'https://cdn.pixabay.com/photo/2017/03/26/11/53/food-platter-2175326_960_720.jpg'
        ),
        new Recipe(
            'Cosa',
            'Güena',
            'https://cdn.pixabay.com/photo/2016/12/26/17/28/food-1932466__340.jpg'
        ),
    ];

    constructor() {}

    ngOnInit() {}

    onRecipeSelected(recipe: Recipe) {
        this.recipeWasSelected.emit(recipe);
        console.log('recipe-list gets data!' + recipe);
    }
}
