/**
 * Created by chris on 2017-07-30.
 */
import { ActionContext, Store } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';
import { State as RootState } from '../state';
import {
  Ingredient,
  IIngredient,
  IngredientType,
  IngredientInstance,
  IIngredientInstance,
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

    getIngredients(state: IngredientState): Array<IIngredientInstance> {
      return state.ingredients;
    },
    getSelectedIngredients(state: IngredientState) {
      return state.ingredients.filter((ing) => {
        return ing.isSelected;
      });
    }
  },

  mutations: {
    addIngredients(state: IngredientState, ingredients: Array<IIngredient>) {

      let basket = ingredients.map((_ingredient: Ingredient) => {
        return new IngredientInstance(_ingredient);
      });
      state.ingredients = state.ingredients.concat(basket);
    },

    selectIngredient(state: IngredientState, _ingredient: IIngredientInstance) {
      let ing = state.ingredients.find((_element: IIngredientInstance) => {
        return _element.ingredient.name === _ingredient.ingredient.name;
      });
      ing!.isSelected = !(ing!.isSelected);
    }
  },

  actions: {
    async retrieveIngredients(context: IngredientContext) {
      await new Promise((resolve, _) => {
        setTimeout(() => {
          let Ingredients: Array<IIngredient> = ingredientObjects.map((_ing: any) => {
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


