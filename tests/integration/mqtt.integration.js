import { onConnectionLost, onMessageArrived } from '../../src/mqtt';
import MQTT from 'paho-mqtt';

test('test communication with MQTT broker via pub-sub', done => {
    var client = new MQTT.Client("test.mosquitto.org", 8080, "druppeldashboard");

    function onConnect() {
        try {
            expect(client.clientId).toBe("druppeldashboard");
            done();
        }
        catch (error) {
            done(error);
        }
    }

    // set callback handlers
    client.onConnectionLost = onConnectionLost;

    var options = {
        useSSL: false,
        onSuccess: onConnect
    };
    client.connect(options);
});