/**
 * Created by chris on 2017-07-30.
 */
import { ActionContext, Store } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';
import { State as RootState } from '../state';
import {
  Recipe,
  IRecipe,
  IRecipeInstance,
  RecipeInstance,
  RecipeState } from './recipesState';
//import { ingredientObjects } from './recipesAPI';

type RecipeContext = ActionContext<RecipeState, RootState>;

export const recipes = {
  namespaced: true,

  state: {
    current : null,
    recipes : [],
    totalAmount : 0
  },

  getters: {

    getRecipes(state: RecipeState): Array<IRecipeInstance> {
      return state.recipes;
    },
    getSelectedRecipe(state: RecipeState) {
      return state.recipes.filter((rec) => {
        return rec.isSelected;
      });
    }
  },

  mutations: {
    addRecipes(state: RecipeState, ingredients: Array<IRecipe>) {

      let basket = ingredients.map((_rec: IRecipe) => {
        return new RecipeInstance(_rec);
      });
      state.recipes = state.recipes.concat(basket);
    },

    selectRecipe(state: RecipeState, _rec: IRecipeInstance) {
      let rectemp = state.recipes.find((_element: IRecipeInstance) => {
        return _element.recipe.name === _rec.recipe.name;
      });
      rectemp!.isSelected = !(rectemp!.isSelected);
    }
  },

  actions: {
    /*
    async retrieveRecipes(context: RecipeContext) {
      await new Promise((resolve, _) => {
        setTimeout(() => {
          let Recipes: Array<IRecipe> = ingredientObjects.map((_rec: any) => {
            return new Recipe(_rec);
          });
          commitaddRecipes(context, Recipes);
          resolve();
        }, 500);
      });
    }
    */
  }
};

const { commit, read, dispatch } =
  getStoreAccessors<RecipeState, RootState>('ingredients');

export const readRecipes = read(recipes.getters.getRecipes);
export const readSelectedRecipe = read(recipes.getters.getSelectedRecipe);
export const commitaddRecipes= commit(recipes.mutations.addRecipes);
export const commitSelectRecipe = commit(recipes.mutations.selectRecipe);
//export const dispatchRetrieveRecipes = dispatch(recipes.actions.retrieveRecipes);


