import {
  IItem,
  Item
} from '../shared/sharedState';

export interface IRecipe extends IItem{
  requiredIngredients : Array<string>;
}

export class Recipe extends Item implements IRecipe {
  requiredIngredients : Array<string>

  constructor(_recipe ) {
    super(_recipe);
    this.requiredIngredients = _recipe.requiredIngredients;
  }
}

export interface RecipeState {
  current?: IRecipe;
  recipes: Array<IRecipe>;
}
