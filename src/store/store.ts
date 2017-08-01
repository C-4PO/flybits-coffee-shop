/**
 * Created by chris on 2017-07-30.
 */
import * as Vuex from 'vuex';
import { ingredients } from './ingredients';
import { recipes } from './recipes';
import { State } from './state';

export const createStore = () => new Vuex.Store<State>({
  modules: {
    ingredients,
    recipes
  }
});
