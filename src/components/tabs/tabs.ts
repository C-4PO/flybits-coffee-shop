import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component ({
  template: require('./tabs.html')
})

export default class TabsComponent extends Vue {

  @Prop tabs: Array<string>;
  @Prop selected: string;

  clickedTab(tab) {
    this.$emit('tabClick', tab);
  }

}
