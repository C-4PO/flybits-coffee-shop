import Vue from 'vue';
import Component from 'vue-class-component';

// Components
import TabsComponent from './../tabs/tabs';
import ListComponent from './../list/list';

@Component({
  template: require('./menu.html'),
  components : {
    'fbcs-tabs' : TabsComponent,
    'fbcs-list' : ListComponent
  }
})

export default class MenuComponent extends Vue {



}
