import Vue from 'vue';
import Router from 'vue-router';
import ShoppingMall from '../components/pages/ShoppingMall.vue';
import Register from '../components/pages/Register.vue';
import Login from '../components/pages/Login.vue';
import Goods from '../components/pages/Goods.vue';
import CategoryList from '../components/pages/CategoryList.vue';
import Cart from '../components/pages/cart.vue';
import Main from '../components/pages/Main.vue';
Vue.use(Router);

export default new Router({
    routes: [
        {
            path:'/main',
            name:'Main',
            component:Main,
            children:[
                {
                    path: '/',
                    name: 'ShoppingMall',
                    component: ShoppingMall,
                },
                {
                    path:'/categoryList',
                    name:'CategoryList',
                    component:CategoryList,
                },
                {
                    path:'/cart',
                    name:'Cart',
                    component:Cart,
                },
            ]
        },

        {
            path: '/register',
            name: 'Register',
            component: Register,
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/goods',
            name: 'Goods',
            component: Goods,
        },


        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        },
    ],
});
