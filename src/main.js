import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

var app = new Vue({
  render: h => h(App),
  data: {
    plants: {}
  }
}).$mount('#app')
console.log(process.env.VUE_APP_MQTT_HOST_URL);
var mqtt = require('mqtt');
var clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8);
var client  = mqtt.connect( 
  process.env.VUE_APP_MQTT_HOST_URL, 
    {
       username: process.env.VUE_APP_MQTT_USER_NAME, 
       password: process.env.VUE_APPMQTT_PASSWORD, 
       clientId: clientId,
    }
);
client.on('error', function(err) {
  console.log(err);
});
client.on('connect', function () {
  console.log('sucessfully connected to mqtt broker.');
  
  client.subscribe('Garden/+/Status', function () {
    console.log('Subscribed to Status topic');
  });
  client.subscribe('Garden/+/Measurement/Moisture', function(){
    console.log('Subscribed to Moisture measurements.');
  });
})
 
client.on('message', function (topic, message) {
  var splitTopic = topic.split('/');
  var espId = splitTopic[1];
  if(splitTopic.lastItem === 'Status'){
    if(app.data['plants'][espId] !== undefined){
      app.data['plants'][espId] = {espId: espId, moisture: 0};
      console.log(app.data);
    }
  }
  if(splitTopic.lastItem === 'Moisture'){
    app.data['plants'][espId] = {espId: espId, moisture: message};
  }
})