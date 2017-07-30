import Vue from 'vue';
import Component from 'vue-class-component';

// Components
import MenuComponent from './../menu/menu';
import DisplayComponent from './../display/display';
import SelectionComponent from './../selection/selection';

@Component({
  template: require('./drinks.html'),
  components: {
    'fbcs-drink-menu' : MenuComponent,
    'fbcs-drink-display' : DisplayComponent,
    'fbcs-drink-selection' : SelectionComponent
  }
})
export class DrinkComponent extends Vue {


}
