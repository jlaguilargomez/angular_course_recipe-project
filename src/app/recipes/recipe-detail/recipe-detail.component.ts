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
    private _recipesService: RecipesService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      // Ojo, añadimos el  + para transformar el string en number
      this.id = +params['id'];
      this.recipe = this._recipesService.getRecipe(this.id);
    });
  }

  private onAddToShoppingList() {
    this._recipesService.addIngredientToShoppingList(this.recipe.ingredients);
  }

  public onEditRecipe() {
    this._router.navigate(['edit'], { relativeTo: this._route });
  }

  public onDeleteRecipe() {
    this._recipesService.deleteRecipe(this.id);
    this._router.navigate(['../'], { relativeTo: this._route });
    alert('Recipe deleted!');
  }
}
