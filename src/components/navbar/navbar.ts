import Vue from 'vue';
import { Component, watch } from 'vue-property-decorator';
import { Link } from './link';

@Component({
    template: require('./navbar.html')
})
export class NavbarComponent extends Vue {

    inverted: boolean = true; // default value

    object: { default: string } = { default: 'Default object property!' }; // objects as default values don't need to be wrapped into functions

    links: Link[] = [
        new Link('Home', '/'),
        new Link('Drinks', '/drinks'),
        new Link('Purchase', '/purchase')
    ];

    @watch('$route.path')
    pathChanged() {
    }

    mounted() {
    }
}
