const startMQTTServer = require('./mqttServer');

startMQTTServer();

const mqtt = require('mqtt');
const mqttClient = mqtt.connect("mqtt://127.0.0.1");



mqttClient.subscribe("NEKO/SWITCH/01");

// setInterval(() => {
//     mqttClient.publish("NEKO/SWITCH/01", "foooooo");
// }, 1000)



mqttClient.on("message", ((topic, payload, packet) => {
    console.log(`topic: ${topic}, payload: ${payload}, packet ${packet}`);
}));


const express = require("express");

const app = express();

app.get("/on", ((req, res) => {
    mqttClient.publish("NEKO/SWITCH/01", "on");
    res.status(200).send("ON");
}));

app.get("/off", ((req, res) => {
    mqttClient.publish("NEKO/SWITCH/01", "off");
    res.status(200).send("OFF");
}));

app.listen(4009, () => {
    console.log("HTTP server listening on 4009");
});