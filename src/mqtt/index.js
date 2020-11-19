import MQTT from 'paho-mqtt';
import { onMessageArrived } from './message-handler'
import { STATUS_TOPIC } from './topics'
import { MOISTURE_TOPIC } from './topics'

var mqtt;
var host = process.env.VUE_APP_MQTT_HOST_URL;
var port = Number(process.env.VUE_APP_MQTT_PORT);

export function MQTTconnect() {
  console.log("connecting to " + host + " " + port);
  mqtt = new MQTT.Client(host, port, "clientjs");
  // set callback handlers
  mqtt.onConnectionLost = onConnectionLost;
  mqtt.onMessageArrived = onMessageArrived;
  //document.write("connecting to "+ host);
  var options = {
    useSSL: false,
    userName: process.env.VUE_APP_MQTT_USER_NAME,
    password: process.env.VUE_APP_MQTT_PASSWORD,
    onSuccess: onConnect
  };
  mqtt.connect(options); //connect
}

function onConnect() {
  console.log("Connected");
  mqtt.subscribe(STATUS_TOPIC);
  mqtt.subscribe(MOISTURE_TOPIC);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }

  console.log('attempting to reconnect');
  MQTTconnect();
}

