import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  data: {
    plants: {}
  }
}).$mount('#app')

import MQTT from 'paho-mqtt';

var mqtt;
var host= process.env.VUE_APP_MQTT_HOST_URL;
var port= Number(process.env.VUE_APP_MQTT_PORT);
		
function onConnect() {
	console.log("Connected");
  mqtt.subscribe("Garden/+/Status");
  mqtt.subscribe("Garden/+/Measurement/Moisture");
}

function MQTTconnect() {
	console.log("connecting to "+ host +" "+ port);
  mqtt = new MQTT.Client(host,port,"clientjs");
  // set callback handlers
  mqtt.onConnectionLost = onConnectionLost;
  mqtt.onMessageArrived = onMessageArrived;
	//document.write("connecting to "+ host);
	var options = {
		useSSL:false,
		userName: process.env.VUE_APP_MQTT_USER_NAME,
		password: process.env.VUE_APP_MQTT_PASSWORD,
    onSuccess: onConnect
  };
  mqtt.connect(options); //connect
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }

  console.log('attempting to reconnect');
  MQTTconnect();
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("message arrived on topic: " + message.destinationName + " with contents: " + message.payloadString);
}

MQTTconnect();
