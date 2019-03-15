import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import {post} from './tool/ajax.js'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 
Vue.prototype.$post = post 
// Vue.use(vuescroll);
Vue.use(iView);
Vue.config.productionTip = false
// require('./mock/index.js')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
