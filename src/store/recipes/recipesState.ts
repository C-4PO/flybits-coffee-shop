import { IListable } from '../shared/sharedState';

export interface IStyle {
  logoUrl: string;
  color: string;
}

export interface IRecipe {
  name: string;
  description: string;
  price: number;
  requiredIngredients : Array<string>;
  style: IStyle;
}

export class Recipe implements IRecipe {
  name: string;
  description: string;
  price: number;
  requiredIngredients : Array<string>
  style: IStyle;

  constructor(_recipe ) {
    this.name = _recipe.name;
    this.description = _recipe.description;
    this.price = _recipe.price;
    this.requiredIngredients = _recipe.requiredIngredients;
  }
}

export interface IRecipeInstance {
  recipe: IRecipe;
  isSelected: boolean;
  name: string;
  description: string;
  style: any;

}

export class RecipeInstance implements IListable, IRecipeInstance {
  recipe: IRecipe;
  isSelected: boolean;

  get name() {
    return this.recipe.name;
  }

  get description() {
    return this.recipe.description;
  }

  get style() {
    return this.recipe.style;
  }


  constructor(_recipe: IRecipe) {
    this.recipe = _recipe;
    this.isSelected = false;
  }
}

export interface RecipeState {
  current?: IRecipeInstance;
  recipes: Array<IRecipeInstance>;
}
