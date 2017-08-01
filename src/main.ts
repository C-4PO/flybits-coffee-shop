import * as Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import * as Store from './store';
import * as IngredientsStore from './store/ingredients';
import * as RecipeStore from './store/recipes';

import { DrinkComponent } from './components/drinks';
import { PurchaseComponent } from './components/purchase';
import { ExitComponent } from './components/exit';

// register the plugin
Vue.use(VueRouter);
Vue.use(Vuex);

const store = Store.createStore();

let router = new VueRouter({
  routes: [
    { path: '/', component: DrinkComponent },
    { path: '/purchase', component: PurchaseComponent },
    { path: '/exit', component: ExitComponent}
  ]
});

new Vue({
  el: '#app-main',
  router: router,
  store,
  components: {
  },
  created: function() {
    IngredientsStore.dispatchRetrieveIngredients(this.$store);
    RecipeStore.dispatchRetrieveRecipes(this.$store);
  }
});
