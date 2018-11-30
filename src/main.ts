import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store';
import {Button, Cell, Row, Col, Search, Swipe, SwipeItem, Lazyload, List, NavBar, Field, Toast, Tab, Tabs, PullRefresh, Stepper, Tabbar, TabbarItem} from 'vant';
import 'vant/lib/index.css';
import './libs/rem';
import './assets/iconfont/iconfont.css';
import filters from "./libs/filters.js";

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Search);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(List);
Vue.use(Lazyload);
Vue.use(NavBar);
Vue.use(Field);
Vue.use(Toast);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(PullRefresh);
Vue.use(Stepper);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.config.productionTip = false;


new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
