import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyload from 'vue-lazyload'
import { Message, Input } from 'element-ui'


import store from './store'
import VueCookie from 'vue-cookie'
import 'scss/reset.scss'
import 'styles/iconfont.css'
import 'swiper/css/swiper.css'
import 'element-ui/lib/theme-chalk/index.css';
import env from './env'


// axios.defaults.baseURL = env.baseURL;
axios.defaults.baseURL = 'api';
axios.defaults.timeout = 8000;
console.log('基本路径：',env.baseURL)

const mock = false;
if (mock) {
  require('./mock/api');
}

// 接口错误拦截
axios.interceptors.response.use(function(response){
  let res = response.data;
  let path = location.hash;
  if(res.status == 0){
    return res.data;
  }else if(res.status == 10){
    if (path != '#/index') {
      window.location.href = '/#/login';
    }
    return Promise.reject(res);
  }else{
    alert(res.msg);
    return Promise.reject(res);
  }
});
Vue.prototype.$message = Message;

Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.use(VueLazyload,{
  loading:'/imgs/loading-svg/loading-bars.svg'
})
Vue.use(VueCookie)
Vue.use(Input);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
