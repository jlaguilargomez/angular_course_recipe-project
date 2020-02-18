import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  public recipes: Recipe[];
  private subscription: Subscription;

  constructor(
    private _recipesServices: RecipesService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this._recipesServices.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this._recipesServices.recipes;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public onNewRecipe() {
    this._router.navigate(['new'], { relativeTo: this._route });
  }
}
