import Vue from 'vue';
import Component from 'vue-class-component';

// Components
import ListComponent from './../../components/list/list';

// Store
import * as ingredientStore from './../../store/ingredients';
import * as recipeStore from './../../store/recipes';
import { IItem } from './../../store/shared/sharedState';
import { IIngredient } from '../../store/ingredients/ingredientsState';

@Component({
  template: require('./selection.html'),
  components: {
    'fbcs-list': ListComponent
  }
})

export default class SelectionComponent extends Vue {

  get selectedIngredients(): Array<IItem> {
    return ingredientStore.readIngredients(this.$store).filter((_ing: IIngredient): boolean => {
      return _ing.isSelected;
    }).sort((i1: IIngredient, i2: IIngredient): number => {
      return i2.type - i1.type;
    });
  }

  get price(): number {
    let p = 0;
    this.selectedIngredients.forEach((_ing: IIngredient): void => {
      p += _ing.price;
    });
    return recipeStore.readSelectedRecipe(this.$store) ? recipeStore.readSelectedRecipe(this.$store).price : Number((p).toFixed(2));
  }

  itemSelected(item : IIngredient): void {
    ingredientStore.commitSelectIngredient(this.$store,item);
    recipeStore.commitUpdateRecipeFromIngredients(this.$store, ingredientStore.readIngredients(this.$store).filter((_ing: IIngredient) => {
      return _ing.isSelected;
    }));
  }
}
