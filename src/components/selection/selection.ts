import Vue from 'vue';
import Component from 'vue-class-component';

import ListComponent from './../../components/list/list';

@Component({
  template: require('./selection.html'),
  components: {
    'fbcs-list': ListComponent
  }
})

export default class SelectionComponent extends Vue {

}
