/**
 * Created by chris on 2017-07-30.
 */
import { ActionContext, Store } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';
import { State as RootState } from '../state';
import {
  Recipe,
  IRecipe,
  RecipeState
} from './recipesState';
import { recipeObjects } from './recipesAPI';
import {
  IngredientType,
  IIngredient
} from '../ingredients/ingredientsState';

type RecipeContext = ActionContext<RecipeState, RootState>;

export const recipes = {
  namespaced: true,

  state: {
    current : null,
    recipes : []
  },

  getters: {
    getRecipes(state: RecipeState): Array<IRecipe> {
      return state.recipes;
    },
    getSelectedRecipe(state: RecipeState) {
      return state.current;
    }
  },

  mutations: {

    addRecipe(state: RecipeState, _recipe: IRecipe ) {
      state.recipes.push(_recipe);
    },

    setRecipes(state: RecipeState, _recipes: Array<IRecipe>) {
      state.recipes = state.recipes.concat(_recipes);
    },

    setCurrentRecipe(state: RecipeState, _recipe: IRecipe){
      if(state.current){
        state.current.isSelected = false;
      }
      _recipe.isSelected = true;
      state.current = _recipe;
    },

    updateRecipeFromIngredients(state: RecipeState, _ingredients: Array<IIngredient>) {
      // Get The Ingredient Keys To Match Against Recipe
      let ingredientKeys = _ingredients.filter((_ing: IIngredient) => {
        return _ing.type == IngredientType.Base;
      }).map((_ing: IIngredient) => {
        return _ing.name
      });

      if(state.current) { // if current is set
        // ingredients are the same do nothing
        // ingredients are different search for possible current else null
        if(ingredientKeys != state.current.requiredIngredients){
          // search for another recipe
          let newRecipe = state.recipes.find((_recipe: IRecipe) => {
            //  HACK : would install undescore Library
            return JSON.stringify(_recipe.requiredIngredients) === JSON.stringify(ingredientKeys);
          });
          // if none set to null else add new recipe
          state.current.isSelected = false;
          if(newRecipe){
            newRecipe.isSelected = true;
            state.current = newRecipe;
          } else {
            state.current = null;
          }
        }
      } else { // if current is not set
        // search for possible current else still null
        let newRecipe = state.recipes.find((_recipe: IRecipe) => {
          return JSON.stringify(_recipe.requiredIngredients) === JSON.stringify(ingredientKeys);
        });
        if(newRecipe){
          newRecipe.isSelected = true;
          state.current = newRecipe;
        } else {
          state.current = null;
        }
      }
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
export const commitUpdateRecipeFromIngredients = commit(recipes.mutations.updateRecipeFromIngredients);
export const commitsetRecipes = commit(recipes.mutations.setRecipes);
export const commitsetCurrentRecipe = commit(recipes.mutations.setCurrentRecipe);
export const dispatchRetrieveRecipes = dispatch(recipes.actions.retrieveRecipes);


