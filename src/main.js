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
var host="ec2-100-27-12-57.compute-1.amazonaws.com"; //change this
var port=9001;
		
function onConnect() {
	console.log("Connected ");
  mqtt.subscribe("World");
  var message = new MQTT.Message("Hello");
  message.destinationName = "World";
	mqtt.send(message);
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
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
}

MQTTconnect();
