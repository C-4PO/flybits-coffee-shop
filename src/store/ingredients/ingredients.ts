/**
 * Created by chris on 2017-07-30.
 */
import { ActionContext, Store } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';
import { State as RootState } from '../state';
import {
  Ingredient,
  IngredientInterface,
  IngredientInBasket,
  IngredientInBasketInterFace,
  IngredientState } from './ingredientsState';
import { ingredientObjects } from './ingredientsAPI';

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
    addIngredients(state: IngredientState, ingredients: Array<IngredientInterface>) {

      let basket = ingredients.map((_ingredient: Ingredient) => {
        return new IngredientInBasket(_ingredient);
      });

      state.ingredients = state.ingredients.concat(basket);
      console.log(state.ingredients);
    },

    selectIngredient(state: IngredientState, _ingredient: IngredientInBasketInterFace) {
      state.ingredients.find((_element: IngredientInBasketInterFace) => {
        return _element.ingredient.name === _ingredient.ingredient.name;
      })!.isSelected = true;
    }
  },

  actions: {
    async retrieveIngredients(context: IngredientContext) {
      await new Promise((resolve, _) => {
        setTimeout(() => {
          let Ingredients: Array<IngredientInterface> = ingredientObjects.map((_ing: any) => {
            return new Ingredient(_ing);
          });
          commitaddIngredients(context, Ingredients);
          resolve();
        }, 500);
      });
    }
  }
};

const { commit, read, dispatch } =
  getStoreAccessors<IngredientState, RootState>('ingredients');

export const readIngredients = read(ingredients.getters.getIngredients);
export const readSelectedIngredients = read(ingredients.getters.getSelectedIngredients);
export const commitaddIngredients = commit(ingredients.mutations.addIngredients);
export const commitSelectIngredient = commit(ingredients.mutations.selectIngredient);
export const dispatchRetrieveIngredients = dispatch(ingredients.actions.retrieveIngredients);


