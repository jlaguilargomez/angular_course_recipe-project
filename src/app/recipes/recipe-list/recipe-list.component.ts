import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
    public recipes: Recipe[];

    constructor(
        private recipesServices: RecipesService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.recipes = this.recipesServices.recipes;
    }

    public onNewRecipe() {
        this.router.navigate(['new'], { relativeTo: this.route });
    }
}
