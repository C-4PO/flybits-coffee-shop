import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

// SharedStore
import { IItem } from './../../store/shared/sharedState';

@Component ({
  template: require('./list.html')
})

export default class ListComponent extends Vue {

  @Prop items: Array<IItem>;

  toggleSelect(_item: IItem) {
    this.$emit('itemSelect', _item);
  }

}
