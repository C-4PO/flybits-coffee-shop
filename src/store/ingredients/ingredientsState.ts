export enum IngredientType {
  Base, AddOn
}

export interface IngredientStyle {
  logoUrl: string;
  color: string;
}


export interface Ingredient {
  name: string;
  description: string;
  priceInCAD: number;
  type: IngredientType;
  style: IngredientStyle;
}

export interface IngredientInBasketInterFace {
  ingredient: Ingredient;
  isSelected: boolean;
}

export class IngredientInBasket implements IngredientInBasketInterFace {
  ingredient: Ingredient;
  isSelected: boolean;

  constructor(_ingredient: Ingredient) {
    this.ingredient = _ingredient;
    this.isSelected = false;
  }
}

export interface IngredientState {
  ingredients: Array<IngredientInBasket>;
  totalAmount: number;
}
