const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);
const port = 1883;

const start = () => {
    server.listen(port, () => {
        console.log(`MQTT listening on ${port}`);
    })



};

module.exports = start

