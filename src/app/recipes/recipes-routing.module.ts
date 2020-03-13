import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

import { ModuleWithProviders } from '@angular/core';

export const recipesRoutes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      { path: '', component: RecipeStartComponent },
      // ojo, el orden en el que colocamos las rutas importa para no generar conflictos con parametros opcionales
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent },
    ],
  },
];

@NgModule({
  // en este caso llamamos al método "forChild" que es el encargado de cargar las rutas en los módulos dependientes del anterior
  imports: [RouterModule.forChild(recipesRoutes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
