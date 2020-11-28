import MQTT from 'paho-mqtt';
import { onMessageArrived } from './message-handler'
import { STATUS_TOPIC } from './topics'
import { MOISTURE_TOPIC } from './topics'

var client;
var host = process.env.VUE_APP_MQTT_HOST_URL;
var port = Number(process.env.VUE_APP_MQTT_PORT);

/**
 * Connect to the MQTT client using environment vars and username/password credentials.
 */
export function mqttConnect() {
  console.log("connecting to " + host + " " + port);
  client = new MQTT.Client(host, port, "clientjs");
  
  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  
  var options = {
    useSSL: false,
    userName: process.env.VUE_APP_MQTT_USER_NAME,
    password: process.env.VUE_APP_MQTT_PASSWORD,
    onSuccess: onConnect
  };
  client.connect(options);
}

/**
 * Once connection to the MQTT broker has been established, subscribe to the relevant topics.
 */
export function onConnect() {
  console.log("Connected");
  client.subscribe(STATUS_TOPIC);
  client.subscribe(MOISTURE_TOPIC);
}

/**
 * If the connection to the MQTT broker is lost, log the error message and attempt to reconnect.
 * @param {*} responseObject 
 */
export function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }

  console.log('attempting to reconnect');
  mqttConnect();
}

