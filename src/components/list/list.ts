import Vue from 'vue';
import Component from 'vue-class-component';

// Store
import * as ingredeints from './../../store/ingredients';

@Component ({
  template: require('./list.html')
})

export default class ListComponent extends Vue {

  mounted () {
    console.log('mounted!');
    console.log(ingredeints.readIngredients(this.$store));
  }

  get ingredients () {
    return ingredeints.readIngredients(this.$store);
  }

}
