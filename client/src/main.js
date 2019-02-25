// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick';
import store from './store'
import { Button } from 'mint-ui'
import './mock/mokeServer'   //加载mockServer即可
import './filters'
import axios from 'axios';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false
fastClick.attach(document.body);   //解决移动端点击延迟

//注册全局组件标签
Vue.component(Button.name, Button)    //<mt-button>

Vue.use(iView);
// Vue.use(VueRouter);

Vue.prototype.$http = axios;  
axios.interceptors.request.use(function(config){  
    store.dispatch('showloader')  
    return config  
},function(err){  
    return Promise.reject(err)  
});  
axios.interceptors.response.use(function(response){  
    store.dispatch('hideloader')  
    return response  
},function(err){  
    return Promise.reject(err)  
}); 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
