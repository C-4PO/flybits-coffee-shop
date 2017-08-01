import {
  IItem,
  Item
} from '../shared/sharedState';


export enum IngredientType {
  Base, AddOn
}


export interface IIngredient extends IItem {
  type: IngredientType;
}

export class Ingredient extends Item implements IIngredient {
  type: IngredientType;
  constructor(_ingredient ) {
    super(_ingredient);
    this.type =  _ingredient.type;
  }
}

export interface IngredientState {
  ingredients: Array<IIngredient>;
}
