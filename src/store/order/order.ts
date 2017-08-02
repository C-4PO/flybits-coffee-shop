/**
 * Created by chris on 2017-07-30.
 */
import { ActionContext, Store } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';
import { State as RootState } from '../state';
import {
  IDrink,
  IUser,
  IPurchase,
  IOrder,
  Drink,
  Order,
  OrderState
} from './orderState';
import {
  IItem
} from '../shared/sharedState';
import {
  IIngredient
} from '../ingredients/ingredientsState';
import { RecipeState, IRecipe } from '../recipes/recipesState';


type OrderContext = ActionContext<OrderState, RootState>;

export const order = {
  namespaced: true,

  state: {
    order: new Order(),
    currentDrinkIndex: 0
  },

  getters: {

  },
  mutations: {

    setRecipe(state: OrderState, _recipe: IRecipe): void {
      this.currentDrink.recipe = _recipe;
    },

    setIngredients(state: OrderState, _Ingredients: Array<IIngredient>): void {

    },
    setPurchase(state: OrderState, _purchase: IPurchase) {
      state.order.purchaseInfo = _purchase;
    },

    setUser(state: OrderState, _user: IUser) {
      state.order.userInfo = _user;
    },

    setFinalized(state: OrderState) {
      state.order.finalized = true;
    }

  },

  actions: {

    async makeOrder(context: OrderContext) {
      await new Promise((resolve, _) => {
        setTimeout(() => {
          commitSetFinalized(context);
          resolve();
        }, 500);
      });
    }

  }
};


const { commit, read, dispatch } =
  getStoreAccessors<OrderState, RootState>('order');


/*
export const readRecipes = read(recipes.getters.getRecipes);
export const commitaddRecipe = commit(recipes.mutations.addRecipe);
export const dispatchRetrieveRecipes = dispatch(recipes.actions.retrieveRecipes);
*/

export const commitToggleIngredient = commit(order.mutations.setIngredients);
export const commitSetRecipe = commit(order.mutations.setRecipe);
export const commitSetPurchase = commit(order.mutations.setPurchase);
export const commitSetUser = commit(order.mutations.setUser);
export const commitSetFinalized = commit(order.mutations.setFinalized);
export const dispatchMakeOrder = dispatch(order.actions.makeOrder);


