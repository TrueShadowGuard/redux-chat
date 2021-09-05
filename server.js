const express = require('express');
const ws = require('ws');
const router = require("./router");
const Channel = require("./Channel");
const {ADD_CHANNEL} = require("./front/src/ws/ws_types");
const {NEW_CHANNEL} = require("./front/src/ws/ws_types");
const {NEW_MESSAGE} = require("./front/src/ws/ws_types");
const {ADD_MESSAGE} = require("./front/src/ws/ws_types");
const {INIT} = require("./front/src/ws/ws_types");

const PORT = process.env.PORT || 8080;
const app = express();
app.use(router);

const server = app.listen(PORT, () => console.log(`Server started at ${PORT}`));
const wsServer = new ws.Server({server});

const channels = [{
  id: 0,
  name: 'ТОПОР 18+',
  messages: [{author: 'Vadim', text: 'Hello world'}]
}];

wsServer.on('connection', connection => {
  connection.id = Math.random();
  sendToClient(connection, INIT, channels);

  connection.on('message', message => {
    message = JSON.parse(message);

    switch (message.type) {
      case ADD_MESSAGE:
        const m = message.data.message;
        if(m.author === '') m.author = 'Guest';
        const channelId = message.data.channelId;
        m.id = Math.random();
        channels.find(c => c.id === channelId).messages.push(m);
        console.log('m', m);
        sendToClients(wsServer.clients, NEW_MESSAGE, {channelId, message: m});
        break;
      case ADD_CHANNEL:
        const channel = new Channel(message.data.name);
        channels.push(channel);
        sendToClients(wsServer.clients, NEW_CHANNEL, {channel});
        break;
      default:
        console.error('Unknown message');
    }
  });
  connection.on('close', () => {
  });
});

function sendToClient(connection, type, data) {
  if (data !== undefined) {
    connection.send(JSON.stringify({type, data}));
  } else {
    connection.send(JSON.stringify({type}));
  }
}

function sendToClients(connections, type, data) {
  connections.forEach(connection => sendToClient(connection, type, data));
}



