import { Ingredient } from '../../shared/ingredient.model';
import { Action } from '@ngrx/store';
// le decimos que importe todo lo que hay en ese archivo dentro de un OBJ
import * as ShoppingListActions from './shopping-list.actions';
import { stat } from 'fs';

export interface AppState {
  shoppingList: State;
}

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

// los estados se almacenan siempre como OBJECTS
const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

// action es una interface que contiene un valor del tipo String con el tipo de accion a realizar
export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        // es una buena práctica devolver una copia del estado actual
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    // devolvemos el ESTADO ACTUAL en caso de que no se añadan nuevos datos (al cargar la página)
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      // eslint-disable-next-line no-case-declarations
      const ingredient = state.ingredients[state.editedIngredientIndex];
      // eslint-disable-next-line no-case-declarations
      const updatedIngredient = {
        ...ingredient,
        ...action.payload,
      };
      // eslint-disable-next-line no-case-declarations
      const updatedIngredients = [...state.ingredients];
      updatedIngredient[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredient,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        // filtramos todos los elementos que no coincidan con el índice introducido
        ingredients: state.ingredients.filter((ig, index) => {
          return index !== state.editedIngredientIndex;
        }),
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] },
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    default:
      return state;
  }
}
