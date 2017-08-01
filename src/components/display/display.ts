import Vue from 'vue';
import Component from 'vue-class-component';

// IngredientStore
import * as ingredientStore from './../../store/ingredients';
import { IIngredientInstance } from './../../store/ingredients/ingredientsState';

// RecipeStore
import * as recipeStore from './../../store/recipes';
import IRecipeInstance from './../../store/recipes/recipesState';

@Component ({
  template: require('./display.html')
})

export default class DisplayComponent extends Vue {

  private get currentRecipe(){
    return recipeStore.readSelectedRecipe(this.$store);
  }
  private get selectedIngredients(){
    return ingredientStore.readSelectedIngredients(this.$store)
  }

  get title() {
    let current = this.currentRecipe;
    if(current){
      return current.name;
    } else if (this.selectedIngredients.length > 0) {
      return 'Custom';
    } else {
      return 'Select Recipe Or Ingredients!';
    }
  }

  get description(){
    let current = this.currentRecipe;
    if(current){
      return current.description;
    } else if (this.selectedIngredients.length > 0) {
      return 'Custom';
    } else {
      return '';
    }
  }

}
