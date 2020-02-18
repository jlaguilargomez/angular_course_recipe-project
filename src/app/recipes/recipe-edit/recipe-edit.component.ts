import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _recipeService: RecipesService,
    private _router: Router
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      // si la url tiene parametros en su id, cambiamos 'editMode' a true
      this.editMode = params['id'] ? true : false;
      console.log(this.editMode);
      console.log(this.id);
      this.initForm();
    });
  }

  private initForm() {
    // comenzamos definiendo los parámetros del formulario con valores por defecto
    let recipeName: string;
    let recipeImagePath: string;
    let recipeDescription: string;
    const RECIPE_INGREDIENTS = new FormArray([]);

    // Determinaremos si estamos en modo edición o no y
    if (this.editMode) {
      const RECIPE = this._recipeService.getRecipe(this.id);
      recipeName = RECIPE.name;
      recipeImagePath = RECIPE.imagePath;
      recipeDescription = RECIPE.description;
      if (RECIPE['ingredients']) {
        for (const ingredient of RECIPE.ingredients) {
          RECIPE_INGREDIENTS.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: RECIPE_INGREDIENTS,
    });
  }

  public onSubmit() {
    // const NEW_RECIPE = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // );
    if (this.editMode) {
      this._recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this._recipeService.addRecipe(this.recipeForm.value);
    }
    this._router.navigate(['../'], { relativeTo: this._route });
  }

  get controls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  public onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  public onCancel() {
    this._router.navigate(['../'], { relativeTo: this._route });
  }

  public onDeleteIngredient(index: number) {
    // OJO: mediante este método eliminamos un elemento del array de ingredients
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }
}
