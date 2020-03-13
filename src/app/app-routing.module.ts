import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    // ojo a la ruta, no añadir .TS!!
    loadChildren: './recipes/recipes.module#RecipesModule',
  },
  {
    path: 'shopping-list',
    // ojo a la ruta, no añadir .TS!!
    loadChildren: './shopping-list/shopping-list.module#ShoppingListModule',
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'auth', component: AuthComponent },
  // { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    // generamos pre-loading para poder cargar los módulos necesarios de forma anticipada
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
