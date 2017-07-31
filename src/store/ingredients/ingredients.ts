/**
 * Created by chris on 2017-07-30.
 */
import { ActionContext, Store } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';
import { State as RootState } from '../state';
import { Ingredient, IngredientInBasket, IngredientState } from './ingredientsState';

type IngredientContext = ActionContext<IngredientState, RootState>;

export const ingredients = {
  namespaced: true,

  state: {
    ingredients : [],
    totalAmount : 0
  },

  getters: {

    getIngredients(state: IngredientState) {
      return state.ingredients;
    },
    getSelectedIngredients(state: IngredientState) {
      return state.ingredients.filter((ing) => {
        return ing.isSelected;
      });
    }
  },

  mutations: {
    addIngredients(state: IngredientState, ingredients: Array<Ingredient>) {

      let ingredientsInBasket = ingredients.map((_ingredient: Ingredient) => {
        return new IngredientInBasket(_ingredient);
      });

      state.ingredients = state.ingredients.concat(ingredientsInBasket);
    },

    selectIngredient(state: IngredientState, ingredient: Ingredient) {
      state.ingredients.find((element) => {
        return element.ingredient.name === ingredient.name;
      })!.isSelected = true;
    }
  },

  actions: {
    async retrieveIngredients(context: IngredientContext): Promise<void> {
      await new Promise((resolve, _) => setTimeout(() => resolve(), 500));

    }
  }
};

const { commit, read, dispatch } =
  getStoreAccessors<IngredientState, RootState>('ingredients');

export const readIngredients = read(ingredients.getters.getIngredients);
export const readSelectedIngredients = read(ingredients.getters.getSelectedIngredients);
export const dispatchRetrieveIngredients = dispatch(ingredients.actions.retrieveIngredients);
export const commitSelectIngredient = commit(ingredients.mutations.selectIngredient);

