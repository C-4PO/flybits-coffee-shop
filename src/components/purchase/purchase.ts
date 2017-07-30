import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    template: require('./purchase.html')
})
export class PurchaseComponent extends Vue {

    package: string = 'vue-webpack-typescript';
    repo: string = 'https://github.com/ducksoupdev/vue-webpack-typescript';
    mode: string = process.env.ENV;

}
