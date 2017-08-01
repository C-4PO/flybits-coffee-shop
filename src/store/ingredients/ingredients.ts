/**
 * Created by chris on 2017-07-30.
 */
import { ActionContext, Store } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';
import { State as RootState } from '../state';
import {
  Ingredient,
  IIngredient,
  IngredientState
} from './ingredientsState';
import { ingredientObjects } from './ingredientsAPI';
import { IRecipe } from '../recipes/recipesState';

type IngredientContext = ActionContext<IngredientState, RootState>;

export const ingredients = {
  namespaced: true,

  state: {
    ingredients : [],
    totalAmount : 0
  },

  getters: {

    getIngredients(state: IngredientState): Array<IIngredient> {
      return state.ingredients;
    },
    getSelectedIngredients(state: IngredientState) {
      return state.ingredients.filter((ing: IIngredient): boolean => {
        return ing.isSelected;
      });
    }
  },

  mutations: {
    addIngredients(state: IngredientState, ingredients: Array<IIngredient>) {

      state.ingredients = state.ingredients.concat(ingredients);
    },

    setIngredientsByRecipe(state: IngredientState, recipe: IRecipe) {


      state.ingredients.filter((_ing: IIngredient): boolean => {
        return _ing.isSelected;
      }).forEach((_ing: IIngredient): void => {
        _ing.isSelected = false;
      });

      for (let key of recipe.requiredIngredients){
        let ing = state.ingredients.find((_element: IIngredient) => {
          return _element.name === key;
        });
        ing!.isSelected = true;
      }

    },

    selectIngredient(state: IngredientState, _ingredient: IIngredient) {
      let ing = state.ingredients.find((_element: IIngredient) => {
        return _element.name === _ingredient.name;
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
          commitAddIngredients(context, Ingredients);
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
export const commitAddIngredients = commit(ingredients.mutations.addIngredients);
export const commitSetIngredientsByRecipe = commit(ingredients.mutations.setIngredientsByRecipe);
export const commitSelectIngredient = commit(ingredients.mutations.selectIngredient);
export const dispatchRetrieveIngredients = dispatch(ingredients.actions.retrieveIngredients);


