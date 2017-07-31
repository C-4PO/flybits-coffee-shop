import Vue from 'vue';
import Component from 'vue-class-component';

// Store
import * as ingredeints from './../../store/ingredients';
import {IngredientInBasketInterFace} from '../../store/ingredients/ingredientsState';

@Component ({
  template: require('./list.html')
})

export default class ListComponent extends Vue {

  get ingredients(): Array<IngredientInBasketInterFace> {
    return ingredeints.readIngredients(this.$store);
  }

}
