import Vue from 'vue';
import Component from 'vue-class-component';

// Components
import ListComponent from './../list/list';

import * as ingredientStore from './../../store/ingredients';
import * as recipeStore from './../../store/recipes';
import * as orderStore from './../../store/order';

import {
  IPurchase,
  IUser,
  Purchase,
  User
} from "./../../store/order/orderState";


@Component({
  template: require('./purchase.html'),
  components: {
    'fbcs-list':ListComponent
  }

})
export class PurchaseComponent extends Vue {

  purchase: IPurchase = new Purchase();
  user: IUser = new User();

  get ingredients(){
    return ingredientStore.readSelectedIngredients(this.$store);
  }

  get title() {
    let current = this.currentRecipe;
    if(current){
      return current.name;
    } else if (this.ingredients.length > 0) {
      return 'Custom';
    } else {
      return 'You are required to choose at least one base ingredient!';
    }
  }

  private get currentRecipe(){
    return recipeStore.readSelectedRecipe(this.$store);
  }

  finish(): void {
    // If all the form elements are filled
    orderStore.commitSetPurchase(this.$store,this.purchase);
    orderStore.commitSetUser(this.$store,this.user);
    orderStore.dispatchMakeOrder(this.$store);
    this.$router.push('exit');
  }


}
