import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(Chartkick.use(Chart))

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
