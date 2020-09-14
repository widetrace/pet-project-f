import Vue from 'vue';
import IconBase from '@/components/icons/IconBase.vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'nprogress/nprogress.css';

Vue.component('IconBase', IconBase);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
