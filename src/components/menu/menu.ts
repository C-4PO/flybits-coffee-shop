import Vue from 'vue';
import Component from 'vue-class-component';

// Components
import TabsComponent from './../tabs/tabs';
import ListComponent from './../list/list';

// IngredientStore
import * as ingredientStore from './../../store/ingredients';
import { IIngredient, IngredientType  } from './../../store/ingredients/ingredientsState';

// RecipeStore
import * as recipeStore from './../../store/recipes';

// SharedStore
import { IItem } from './../../store/shared/sharedState';


@Component({
  template: require('./menu.html'),
  components : {
    'fbcs-tabs' : TabsComponent,
    'fbcs-list' : ListComponent
  }
})

export default class MenuComponent extends Vue {

  index: number = 1;
  selectedTab: string = 'Ingredients';

  get group(): Array<IItem> {
    let selectedGroup = this.groups[this.selectedTab];
    return selectedGroup ? selectedGroup : [];
  }

  get groups() {
    // Could get groups from a more complex api
    return {
      'Recipes': recipeStore.readRecipes(this.$store),
      'Ingredients': ingredientStore.readIngredients(this.$store).filter((_ing: IIngredient) => {
        return _ing.type === IngredientType.Base && !_ing.isSelected;
      }),
      'AddOns' : ingredientStore.readIngredients(this.$store).filter((_ing: IIngredient) => {
        return _ing.type === IngredientType.AddOn && !_ing.isSelected;
      })
    };
  };

  itemSelected(item : any): void {
    switch (this.selectedTab) {
      case 'AddOns':
      case 'Ingredients':
        ingredientStore.commitSelectIngredient(this.$store,item);
        recipeStore.commitUpdateRecipeFromIngredients(this.$store, ingredientStore.readIngredients(this.$store).filter((_ing: IIngredient) => {
          return _ing.isSelected;
        }));
        break;
      case 'Recipes':
        recipeStore.commitsetCurrentRecipe(this.$store,item);
        ingredientStore.commitSetIngredientsByRecipe(this.$store,item);
        break;
    }
  }

  tabSwitch(tab): void {
    this.selectedTab = tab;
  }

}
