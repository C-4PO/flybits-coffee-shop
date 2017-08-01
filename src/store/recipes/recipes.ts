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
import {
  IngredientType,
  IIngredientInstance
} from '../ingredients/ingredientsState';

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

    setCurrentRecipe(state: RecipeState, _recipe: IRecipeInstance){
      if(state.current){
        state.current.isSelected = false;
      }
      _recipe.isSelected = true;
      state.current = _recipe;
    },

    updateRecipeFromIngredients(state: RecipeState, _ingredients: Array<IIngredientInstance>) {
      let ingredientKeys = _ingredients.filter((_ing: IIngredientInstance) => {
        return _ing.ingredient.type = IngredientType.Base;
      }).map((_ing: IIngredientInstance) => {
        return _ing.name
      });

      // if ingredients are the same
      if(ingredientKeys != state.current.recipe.requiredIngredients){
        // search for another recipe
        let newRecipe = state.recipes.find((_recipe: IRecipeInstance) => {
          return _recipe.recipe.requiredIngredients == ingredientKeys;
        });
        // if none set to null else add new recipe
        state.current = newRecipe ? newRecipe: null;
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
export const commitsetCurrentRecipe= commit(recipes.mutations.setCurrentRecipe);
export const dispatchRetrieveRecipes = dispatch(recipes.actions.retrieveRecipes);


