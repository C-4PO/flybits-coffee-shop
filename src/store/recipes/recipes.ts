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
import { recipeObjects } from './recipesAPI';

type RecipeContext = ActionContext<RecipeState, RootState>;

export const recipes = {
  namespaced: true,

  state: {
    current : null,
    recipes : []
  },

  getters: {

    getRecipes(state: RecipeState): Array<IRecipeInstance> {
      return state.recipes;
    },
    getSelectedRecipe(state: RecipeState) {
      return state.current;
    }
  },

  mutations: {

    addRecipe(state: RecipeState, _recipe: IRecipeInstance ) {
      state.recipes.push(_recipe);
    },

    setRecipes(state: RecipeState, _recipes: Array<IRecipe>) {

      let basket = _recipes.map((_rec: IRecipe) => {
        return new RecipeInstance(_rec);
      });
      state.recipes = state.recipes.concat(basket);
    },

    setCurrentRecipe(state: RecipeState, _rec: IRecipeInstance){
      if(state.current){
        state.current.isSelected = false;
      }
      _rec.isSelected = true;
      state.current = _rec;
    }
  },

  actions: {
    async retrieveRecipes(context: RecipeContext) {
      await new Promise((resolve, _) => {
        setTimeout(() => {
          let Recipes: Array<IRecipe> = recipeObjects.map((_rec: any) => {
            return new Recipe(_rec);
          });
          commitsetRecipes(context, Recipes);
          resolve();
        }, 500);
      });
    }

  }
};

const { commit, read, dispatch } =
  getStoreAccessors<RecipeState, RootState>('recipes');

export const readRecipes = read(recipes.getters.getRecipes);
export const readSelectedRecipe = read(recipes.getters.getSelectedRecipe);
export const commitaddRecipe = commit(recipes.mutations.addRecipe);
export const commitsetRecipes = commit(recipes.mutations.setRecipes);
export const commitsetCurrentRecipe= commit(recipes.mutations.setCurrentRecipe);
export const dispatchRetrieveRecipes = dispatch(recipes.actions.retrieveRecipes);


