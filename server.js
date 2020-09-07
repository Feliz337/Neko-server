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

let switch01BurnOut = false;
let switch02BurnOut = false;

let switch01BurnOutAt = Date.now();
let switch02BurnOutAt = Date.now();

let switch01CoolDownTime = 5000
let switch02CoolDownTime = 500



const express = require("express");

const app = express();

app.get("/SWITCH/01/on", ((req, res) => {
    if (!switch01BurnOut) {
        switch01BurnOut = true;
        switch01BurnOutAt = new Date();

        mqttClient.publish("NEKO/SWITCH/01", "on");
        res.status(200).send("SUCCESS,01ON");


        setTimeout(() => switch01BurnOut = false, switch01CoolDownTime);
    } else {
        res.status(400).send(`BurnOut,${switch01CoolDownTime - (Date.now() - switch01BurnOutAt)}`);
    }

}));

app.get("/SWITCH/01/off", ((req, res) => {
    if (!switch01BurnOut) {
        switch01BurnOut = true;
        switch01BurnOutAt = new Date();

        mqttClient.publish("NEKO/SWITCH/01", "off");
        res.status(200).send("SUCCESS,01OFF");

        setTimeout(() => switch01BurnOut = false, switch01CoolDownTime);
    } else {
        res.status(400).send(`BurnOut,${switch01CoolDownTime - (Date.now() - switch01BurnOutAt)}`);
    }

}));

app.get("/SWITCH/02/on", ((req, res) => {
    if (!switch02BurnOut) {
        switch02BurnOut = true;
        switch02BurnOutAt = new Date();
        mqttClient.publish("NEKO/SWITCH/02", "on");
        res.status(200).send("SUCCESS,02ON");

        setTimeout(() => switch02BurnOut = false, switch02CoolDownTime);
    } else {
        res.status(400).send(`BurnOut,${switch02CoolDownTime - (Date.now() - switch02BurnOutAt)}`);
    }

}));


app.get("/SWITCH/02/off", ((req, res) => {
    if (!switch02BurnOut) {
        switch02BurnOut = true;
        switch02BurnOutAt = new Date();
        mqttClient.publish("NEKO/SWITCH/02", "off");
        res.status(200).send("SUCCESS,02OFF");

        setTimeout(() => switch02BurnOut = false, switch02CoolDownTime);
    } else {
        res.status(400).send(`BurnOut,${switch02CoolDownTime - (Date.now() - switch02BurnOutAt)}`);
    }
}));

app.listen(4009, () => {
    console.log("HTTP server listening on 4009");
});

