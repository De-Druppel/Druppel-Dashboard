import Vue from 'vue'
import store from './store'
import App from './App.vue'
import { MQTTconnect } from './mqtt-connection'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
  mounted: function(){
    MQTTconnect();
  }
}).$mount('#app')
