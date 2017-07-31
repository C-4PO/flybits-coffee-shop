export enum IngredientType {
  Base, AddOn
}

export interface IngredientStyleInterface {
  logoUrl: string;
  color: string;
}


export interface IngredientInterface {
  name: string;
  description: string;
  priceInCAD: number;
  type: IngredientType;
  style: IngredientStyleInterface;
}

export class Ingredient implements IngredientInterface {
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

export interface IngredientInBasketInterFace {
  ingredient: IngredientInterface;
  isSelected: boolean;
}

export class IngredientInBasket implements IngredientInBasketInterFace {
  ingredient: IngredientInterface;
  isSelected: boolean;

  constructor(_ingredient: IngredientInterface) {
    this.ingredient = _ingredient;
    this.isSelected = false;
  }
}

export interface IngredientState {
  ingredients: Array<IngredientInBasket>;
  totalAmount: number;
}
