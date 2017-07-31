import Vue from 'vue';
import Component from 'vue-class-component';
import { IListable } from '../../store/shared/sharedState';
import { Prop } from 'vue-property-decorator';

import * as ingredientStore from './../../store/ingredients';
import { IIngredientInstance } from './../../store/ingredients/ingredientsState';

@Component ({
  template: require('./list.html')
})

export default class ListComponent extends Vue {

  @Prop items: Array<IListable>;

  toggleSelect(_ing: IIngredientInstance) {
    ingredientStore.commitSelectIngredient(this.$store, _ing);
  }

}
