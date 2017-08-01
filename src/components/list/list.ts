import Vue from 'vue';
import Component from 'vue-class-component';
import { IListable } from '../../store/shared/sharedState';
import { Prop } from 'vue-property-decorator';

@Component ({
  template: require('./list.html')
})

export default class ListComponent extends Vue {

  @Prop items: Array<IListable>;

  toggleSelect(_item: IListable) {
    this.$emit('itemSelect', _item);
  }

}
