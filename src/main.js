import Vue from 'vue'
import store from './store'
import App from './App.vue'
import { mqttConnect } from './mqtt'
import { LayoutPlugin } from 'bootstrap-vue'
import { ButtonPlugin } from 'bootstrap-vue'

require('bootstrap/dist/css/bootstrap.css');
require('bootstrap-vue/dist/bootstrap-vue.css');
require('./application.css');
Vue.config.productionTip = false
Vue.use(LayoutPlugin)
Vue.use(ButtonPlugin)

new Vue({
  store,
  render: h => h(App),
  mounted: function () {
    mqttConnect();
  }
}).$mount('#app')