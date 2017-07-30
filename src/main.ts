import * as Vue from 'vue';
import VueRouter from 'vue-router';

import { HomeComponent } from './components/home';
import { DrinkComponent } from './components/drinks';
import { PurchaseComponent } from './components/purchase';
import { ExitComponent } from './components/exit';
import { NavbarComponent } from './components/navbar';

// register the plugin
Vue.use(VueRouter);

let router = new VueRouter({
  routes: [
    { path: '/', component: HomeComponent },
    { path: '/drinks', component: DrinkComponent },
    { path: '/purchase', component: PurchaseComponent },
    { path: '/exit', component: ExitComponent}
  ]
});

new Vue({
  el: '#app-main',
  router: router,
  components: {
    'navbar': NavbarComponent
  }
});
