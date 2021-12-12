/* eslint no-param-reassign: ["error", { "props": false }] */
import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import store from '@/store/index';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch('game/getInfo', 'previous')
        .then((res) => {
          routeTo.params.previousGameStatus = res;
          store.dispatch('game/getInfo', 'next').then((resolve) => {
            routeTo.params.nextGameStatus = resolve;
            next();
          });
        })
        .catch((error) => {
          if (error.respnse && error.response.status === 404) {
            next({ name: '404' });
          } else {
            next({ name: 'network-issue' });
          }
        });
    },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/NotFound.vue'),
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: () => import(/* webpackChunkName: "network-issue" */ '../views/NetworkIssue.vue'),
  },
  {
    path: '*',
    redirect: { name: '404' },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
