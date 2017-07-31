import Vue from 'vue';
import Component from 'vue-class-component';

// Components
import TabsComponent from './../tabs/tabs';
import ListComponent from './../list/list';

// Store
import * as ingredientStore from './../../store/ingredients';
import { IIngredientInstance } from './../../store/ingredients/ingredientsState';
import { IngredientType } from './../../store/ingredients/ingredientsState';
import { IListable } from './../../store/shared/sharedState';

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

  get groups() {
    // Could get groups from a more complex api
    return {
      'Recipe': [],
      'Ingredients': ingredientStore.readIngredients(this.$store).filter((_ing: IIngredientInstance) => {
        return _ing.ingredient.type === IngredientType.Base;
      }),
      'AddOns' : ingredientStore.readIngredients(this.$store).filter((_ing: IIngredientInstance) => {
        return _ing.ingredient.type === IngredientType.AddOn;
      })
    };
  };

  get group(): Array<IListable> {
    let selectedGroup = this.groups[this.selectedTab];
    return selectedGroup ? selectedGroup : [];
  }

  get ingredients(): Array<IIngredientInstance> {
    return ingredientStore.readIngredients(this.$store);
  }

  tabSwitch(tab): void {
    this.selectedTab = tab;
  }

}
