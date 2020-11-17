import store from '../store'
import { CREATE_ITEM } from '../store/mutation-types';

// called when a message arrives
export function onMessageArrived(message) {
  console.log("message arrived on topic: " + message.destinationName + " with contents: " + message.payloadString);

  var splitTopic = message.destinationName.split('/');
  var espId = splitTopic[1];
  var topic = splitTopic.pop();

  if (topic === "Status") {
    var status = message.payloadString === '1';
    store.dispatch(CREATE_ITEM, { espId: espId, status: status, moisture: 'Unknown' });
  }

  if (topic === "Moisture") {
    var moisture = message.payloadString;
    store.state.Plants.foreach(
      function (value) {
        if (value.espId === espId) {
          value.moisture = moisture;
        }
      }
    );
  }
}