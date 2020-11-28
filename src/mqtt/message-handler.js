import store from '../store'
import { CREATE_ITEM, UPDATE_ITEM } from '../store/mutation-types';
import MQTT from 'paho-mqtt'

/**
 * Callback for the MQTT client to be called whenever a message is recieved on a subscribed topic.
 * Determine the topic based on the destinationName and route it to the correct function.
 * @param {MQTT.Message} message 
 */
export function onMessageArrived(message) {
  console.log("message arrived on topic: " + message.destinationName + " with contents: " + message.payloadString);

  var splitTopic = message.destinationName.split('/');
  var espId = Number(splitTopic[1]);
  var topic = splitTopic.pop();

  if (topic === "Status") {
    var status = message.payloadString === '1';
    updateStatus(espId, status)
  }

  if (topic === "Moisture") {
    var moisture = message.payloadString;
    updateMoisture(espId, moisture)
  }
}

/**
 * Find the plant item in the store that has the correct espId for the message and update its status. If no matching item is found for the espId, create a new one.
 * @param {Number} espId 
 * @param {Boolean} status 
 */
function updateStatus(espId, status)
{
  let hasUpdated = false;
  store.state.Plants.forEach((element, index) => {
    if (element.espId === espId) {
      store.commit(UPDATE_ITEM, { index: index, espId:espId, status: status, moisture: element.moisture });
      hasUpdated = true;
    }
  });
  if(hasUpdated === false){
    addPlant(espId, status);
  }
}

/**
 * Find the plant item in the store that has the correct espId for the message and update its moisture. If no matching item is found for the espId, create a new one.
 * @param {Number} espId 
 * @param {String} moisture 
 */
function updateMoisture(espId, moisture)
{
  let hasUpdated = false;
  store.state.Plants.forEach((element, index) => {
    if (element.espId === espId) {
      store.commit(UPDATE_ITEM, { index: index, espId:espId, status: element.status, moisture: moisture });
      hasUpdated = true;
    }
  });
  if(hasUpdated === false){
    addPlant(espId, status);
  }
}

function addPlant(espId, status = false, moisture = '00.00') {
  store.commit(CREATE_ITEM, { espId: espId, status: status, moisture: moisture });
}