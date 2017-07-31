import { IListable } from '../shared/sharedState';

export enum IngredientType {
  Base, AddOn
}

export interface IngredientStyleInterface {
  logoUrl: string;
  color: string;
}


export interface IIngredient {
  name: string;
  description: string;
  priceInCAD: number;
  type: IngredientType;
  style: IngredientStyleInterface;
}

export class Ingredient implements IIngredient {
  name: string;
  description: string;
  priceInCAD: number;
  type: IngredientType;
  style: IngredientStyleInterface;

  constructor(_ingredient ) {
    this.name = _ingredient.name;
    this.description = _ingredient.description;
    this.priceInCAD = _ingredient.price;
    this.type =  _ingredient.type;
  }
}

export interface IIngredientInstance {
  ingredient: IIngredient;
  isSelected: boolean;
  name: string;
  description: string;
  style: any;


}

export class IngredientInstance implements IListable, IIngredientInstance {
  ingredient: IIngredient;
  isSelected: boolean;

  get name() {
    return this.ingredient.name;
  }

  get description() {
    return this.ingredient.description;
  }

  get style() {
    return this.ingredient.style;
  }


  constructor(_ingredient: IIngredient) {
    this.ingredient = _ingredient;
    this.isSelected = false;
  }
}

export interface IngredientState {
  ingredients: Array<IIngredientInstance>;
  totalAmount: number;
}
