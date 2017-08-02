import { IngredientState } from "./ingredients/ingredientsState";
import { RecipeState } from "./recipes/recipesState";
import { OrderState } from './order/orderState';

export interface State {
  ingredients: IngredientState;
  recipes : RecipeState;
  orders : OrderState;
}
