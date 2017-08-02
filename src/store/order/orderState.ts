import {
  IRecipe
} from '../recipes/recipesState';

import {
  IIngredient
} from '../ingredients/ingredientsState';

export interface IDrink {
  id: number;
  ingredients: Array<IIngredient>;
  recipe?: IRecipe;
  name: string;
  description: string;
  price: number;

}

export interface IUser {
  firstName: string;
  lastName: string;
  address: string;
  postalCode: string;
}

export interface IPurchase {
  cardNumber: string;
  expiryMonth: number;
  exiryYear: number;
  securityCode: number;
  cardType: string; // replace with enum of VISA, Mastercard etc.
  itemCharge: number;
  deliveryCharge: number;
  tax: number;
  totalCharge: number;
}

export interface IOrder {
  id: number;
  date: Date;
  drinks: Array<IDrink>;
  userInfo: IUser;
  purchaseInfo: IPurchase;
  finalized: boolean;
}

export class Drink implements  IDrink {
  private _id: number;
  private _price: number;
  public ingredients: Array<IIngredient>;
  public recipe?: IRecipe;

  constructor() {
    this._id = Math.random();
  }
  get id(): number {
    return this._id;
  }

  get price() {
    return 0;
  }

  get name(): string {
    if (this.recipe) {
      return this.recipe.name;
    } else {
      return 'Custom';
    }
  }

  get description(): string {
    if (this.recipe) {
      return this.recipe.description;
    } else {
      return 'Custom';
    }
  }

  public verify(): boolean {
    return this.ingredients.length > 0;
  }
}

export class User implements IUser {
  firstName: string;
  lastName: string;
  address: string;
  postalCode: string;
}

export class Purchase implements IPurchase {
  cardNumber: string;
  expiryMonth: number;
  exiryYear: number;
  securityCode: number;
  cardType: string; // replace with enum of VISA, Mastercard etc.
  itemCharge: number;
  deliveryCharge: number;
  tax: number;
  totalCharge: number;
}


export class Order implements IOrder {

  private _id: number;
  private _date: Date;
  public drinks: Array<IDrink>;
  public userInfo: IUser;
  public purchaseInfo: IPurchase;
  public finalized: boolean;

  constructor() {
    this._id = Math.random();
    this._date = new Date();
    this.drinks = [new Drink()];
  }

  get id(): number {
    return this.id;
  }

  get date(): Date {
    return this._date;
  }
}

export interface OrderState {
  order: IOrder;
}
