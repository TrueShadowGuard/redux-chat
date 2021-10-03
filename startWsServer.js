const ws = require('ws');
const jwt = require('jsonwebtoken');
const UserModel = require('./models/User');

const Channel = require("./utils/Channel");
const secret = process.env.JWT_SECRET;

const {
  BAD_TOKEN,
  INIT,
  NEW_CHANNEL,
  NEW_MESSAGE,
  ONLINE,
  TYPING,
  ADD_MESSAGE,
  ADD_CHANNEL,
  MAX_MESSAGES_IN_CHANNEL,
} = require("./front/src/ws/consts");

const startWsServer = (httpServer) => {
  const wsServer = new ws.Server({server: httpServer});

  const channels = [new Channel('ТОПОР 18+')];

  wsServer.on('connection', connection => {

    connection.on('message', async message => {
      message = JSON.parse(message);
      console.log('message', message);

      const token = message.token;
      if (!token) {
        sendToClient(connection, BAD_TOKEN);
        return;
      }

      let payload;
      try {
        payload = jwt.verify(token, secret);
        if (!payload) {
          sendToClient(connection, BAD_TOKEN);
          return;
        }
      } catch (e) {
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
          await UserModel.updateOne({username: connection.username}, {
            $inc: {
              messagesSent: 1
            }
          });
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
}

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

module.exports = startWsServer;
