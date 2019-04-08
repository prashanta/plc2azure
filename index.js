const { Controller, Tag, TagGroup } = require("ethernet-ip");
var Mqtt = require('azure-iot-device-mqtt').Mqtt;
var DeviceClient = require('azure-iot-device').Client
var Message = require('azure-iot-device').Message;

var connectionString = process.env.CONN_STRING;
console.log(connectionString);
var client = DeviceClient.fromConnectionString(connectionString, Mqtt);
var PLCIP = "10.166.2.105";
const PLC = new Controller();
const group = new TagGroup();
console.log("Starting application ... ");

// Add some tags to group
group.add(new Tag("T_100")); // Controller Scope Tag
group.add(new Tag("T_200")); // Controller Scope Tag
group.add(new Tag("T_300")); // Controller Scope Tag

console.log("Connecting to PLC @ " + PLCIP);

PLC.connect(PLCIP, 0).then(() => {
    console.log("Connection to PLC ... successful!");
    console.log(PLC.properties);

    setInterval(function(){
        var obj = {};
        PLC.readTagGroup(group).then(() => {
            group.forEach(tag => {
                obj[ tag.name ] = tag.value;
            });
            var message = new Message(JSON.stringify(obj));
            console.log('Sending message: ' + message.getData());
            // Send the message.
            client.sendEvent(message, function (err) {
              if (err) {
                console.error('send error: ' + err.toString());
              } else {
                console.log('message sent');
              }
            });
        });
    },1000);
})
.catch(e => {
    console.log(e);  // returns a promise
    console.log("Try again");
});
