import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'scss/reset.scss'
import 'styles/iconfont.css'
import 'swiper/css/swiper.css'
import env from './env'


axios.defaults.baseURL = env.baseURL;
axios.defaults.timeout = 8000;
console.log('基本路径：',env.baseURL)

const mock = true;
if (mock) {
  require('./mock/api');
}

// 接口错误拦截
axios.interceptors.response.use(function(response){
  let res = response.data;
  if(res.status == 0){
    return res.data;
  }else if(res.status == 10){
    window.location.href = '/#/login';
  }else{
    alert(res.msg);
  }
});


Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
