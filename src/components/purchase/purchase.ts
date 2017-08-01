import Vue from 'vue';
import Component from 'vue-class-component';

// Components
import ListComponent from './../list/list';

// IngredientStore
import * as ingredientStore from './../../store/ingredients';
// RecipeStore
import * as recipeStore from './../../store/recipes';

@Component({
  template: require('./purchase.html'),
  components: {
    'fbcs-list':ListComponent
  }

})
export class PurchaseComponent extends Vue {

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

  /*
  get selectedRecipe(){

  }*/


}
