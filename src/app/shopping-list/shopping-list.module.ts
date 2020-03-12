import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    // al sólo tener 1 ruta, podemos hacer la ruta directamente desde aquí sin crear otro MÓDULO para el routing
    // RouterModule.forChild([
    //   { path: 'shopping-list', component: ShoppingListComponent },
    // ]),
  ],
  // no es necesario exportar porque estamos navegando también en ese módulo
})
export class ShoppingListModule {}
