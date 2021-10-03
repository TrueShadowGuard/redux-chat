const express = require('express');
const ws = require('ws');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config();

const router = require("./router");
const Channel = require("./utils/Channel");
const User = require('./models/User');
const {BAD_TOKEN} = require("./front/src/ws/consts");

const {MAX_MESSAGES_IN_CHANNEL} = require("./front/src/ws/consts");
const {ONLINE} = require("./front/src/ws/consts");
const {TYPING} = require("./front/src/ws/consts");
const {ADD_CHANNEL} = require("./front/src/ws/consts");
const {NEW_CHANNEL} = require("./front/src/ws/consts");
const {NEW_MESSAGE} = require("./front/src/ws/consts");
const {ADD_MESSAGE} = require("./front/src/ws/consts");
const {INIT} = require("./front/src/ws/consts");

const PORT = process.env.PORT || 3001;
const secret = process.env.JWT_SECRET;
const app = express();

mongoose.connect(process.env.MONGO)
  .then(r => {
    console.log("Connected to mongodb");
  })

app.use(cors());
app.use(bodyParser.json());
app.use(router);

const server = app.listen(PORT, () => console.log(`Server started at ${PORT}`));
const wsServer = new ws.Server({server});

const channels = [new Channel('ТОПОР 18+')];

wsServer.on('connection', connection => {

  connection.on('message', message => {
    message = JSON.parse(message);
    console.log('message', message);
    const token = message.token;
    if (!token) {
      sendToClient(connection, BAD_TOKEN);
      return;
    }
    const payload = jwt.verify(token, secret);
    if (!payload) {
      sendToClient(connection, BAD_TOKEN);
      return;
    }

    switch (message.type) {
      case INIT:
        const username = payload?.username || 'unnamed';
        connection.id = Math.random();
        connection.username = username;
        sendToClient(connection, INIT, {channels, online: wsServer.clients.size, username});
        sendToClients(wsServer.clients, ONLINE, {online: wsServer.clients.size});
        break;
      case ADD_MESSAGE:
        const m = message.data.message;
        const channelId = message.data.channelId;
        m.id = Math.random();
        m.author = connection.username;
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



