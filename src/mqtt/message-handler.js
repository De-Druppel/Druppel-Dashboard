import store from '../store'
import { CREATE_ITEM, UPDATE_ITEM } from '../store/mutation-types';

// called when a message arrives
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

function updateStatus(espId, status)
{
  var hasUpdated = false;
  store.state.Plants.forEach((element, index) => {
    if (element.espId === espId) {
      store.commit(UPDATE_ITEM, { index: index, status: status, moisture: element.moisture });
      hasUpdated = true;
    }
  });
  if(hasUpdated === false){
    addPlant(espId, status);
  }
}

function updateMoisture(espId, moisture)
{
  var hasUpdated = false;
  store.state.Plants.forEach((element, index) => {
    if (element.espId === espId) {
      store.commit(UPDATE_ITEM, { index: index, status: element.status, moisture: moisture });
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