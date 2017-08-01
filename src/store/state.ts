import { IngredientState } from "./ingredients/ingredientsState";
import { RecipeState } from "./recipes/recipesState";

export interface State {
  ingredients: IngredientState;
  recipes : RecipeState;
}
