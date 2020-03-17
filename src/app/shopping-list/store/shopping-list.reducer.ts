import { Ingredient } from '../../shared/ingredient.model';
import { Action } from '@ngrx/store';
// le decimos que importe todo lo que hay en ese archivo dentro de un OBJ
import * as ShoppingListActions from './shopping-list.actions';

// los estados se almacenan siempre como OBJECTS
const initialState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
};

// action es una interface que contiene un valor del tipo String con el tipo de accion a realizar
export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.AddIngredient
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        // es una buena práctica devolver una copia del estado actual
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    // devolvemos el ESTADO ACTUAL en caso de que no se añadan nuevos datos (al cargar la página)
    default:
      return state;
  }
}
