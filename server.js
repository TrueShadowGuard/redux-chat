const express = require('express');
const ws = require('ws');
const router = require("./router");
const Channel = require("./Channel");
const {ONLINE} = require("./front/src/ws/ws_types");
const {TYPING} = require("./front/src/ws/ws_types");
const {ADD_CHANNEL} = require("./front/src/ws/ws_types");
const {NEW_CHANNEL} = require("./front/src/ws/ws_types");
const {NEW_MESSAGE} = require("./front/src/ws/ws_types");
const {ADD_MESSAGE} = require("./front/src/ws/ws_types");
const {INIT} = require("./front/src/ws/ws_types");

const PORT = process.env.PORT || 3001;
const app = express();
app.use(router);

const server = app.listen(PORT, () => console.log(`Server started at ${PORT}`));
const wsServer = new ws.Server({server});

const channels = [new Channel('ТОПОР 18+')];

wsServer.on('connection', connection => {
  connection.id = Math.random();
  sendToClient(connection, INIT, {channels, online: wsServer.clients.size});
  sendToClients(wsServer.clients, ONLINE, {online: wsServer.clients.size});

  connection.on('message', message => {
    message = JSON.parse(message);

    switch (message.type) {
      case ADD_MESSAGE:
        const m = message.data.message;
        if(m.author === '') m.author = 'Guest';
        const channelId = message.data.channelId;
        m.id = Math.random();
        channels.find(c => c.id === channelId).messages.push(m);
        sendToClients(wsServer.clients, NEW_MESSAGE, {channelId, message: m});
        break;
      case ADD_CHANNEL:
        const channel = new Channel(message.data.name);
        channels.push(channel);
        sendToClients(wsServer.clients, NEW_CHANNEL, {channel});
        break;
      case TYPING:
        sendToClients(wsServer.clients, 'TYPING', {channelId: message.data.channelId});
        break;
      default:
        console.error('Unknown message');
    }
  });
  connection.on('close', () => {
    sendToClients(wsServer.clients, ONLINE, {online: wsServer.clients.size});
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



