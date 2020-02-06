import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
    recipe: Recipe;
    id: number;

    constructor(
        private recipesService: RecipesService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    private onAddToShoppingList() {
        this.recipesService.addIngredientToShoppingList(
            this.recipe.ingredients
        );
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            // Ojo, añadimos el  + para transformar el string en number
            this.id = +params['id'];
            this.recipe = this.recipesService.getRecipe(this.id);
        });
    }

    public onEditRecipe() {
        this.router.navigate(['edit'], { relativeTo: this.route });
    }
}
