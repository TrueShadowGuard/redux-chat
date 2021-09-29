const express = require('express');
const ws = require('ws');
const router = require("./router");
const Channel = require("./Channel");
const {MAX_MESSAGES_IN_CHANNEL} = require("./front/src/ws/consts");
const {ONLINE} = require("./front/src/ws/consts");
const {TYPING} = require("./front/src/ws/consts");
const {ADD_CHANNEL} = require("./front/src/ws/consts");
const {NEW_CHANNEL} = require("./front/src/ws/consts");
const {NEW_MESSAGE} = require("./front/src/ws/consts");
const {ADD_MESSAGE} = require("./front/src/ws/consts");
const {INIT} = require("./front/src/ws/consts");

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
        if (m.author === '') m.author = 'Guest';
        const channelId = message.data.channelId;
        m.id = Math.random();
        const c = channels.find(c => c.id === channelId);
        c.messages.push(m);
        c.messages.splice(0, c.messages.length - MAX_MESSAGES_IN_CHANNEL);
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



