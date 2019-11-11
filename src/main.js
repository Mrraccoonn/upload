// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(VueResource);

Vue.http.options.emulateHTTP=true;
Vue.config.productionTip = false
Vue.http.interceptors.push((request, next) => { 
    //console.log(Login.item); 
    var tokens = localStorage.token; 
    Vue.http.options.headers={Authorization: "Bearer " + tokens}; 
    //console.log(request.headers); 
    next((response) => { 
         return response 
     }) 
}) 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
