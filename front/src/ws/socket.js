import {
  addChannel,
  addMessage,
  changeChannel,
  setChannels,
  setOnline,
  setReconnecting, setToken,
  setTyping, setUsername
} from "../state/reducer";
import store from "../state/store";
import {BAD_TOKEN, INIT, NEW_CHANNEL, NEW_MESSAGE, ONLINE, TYPING} from "./consts";
import {setTypingAsync} from "../state/async";
import sendInit from "./sendInit";


const host = process.env.NODE_ENV === 'development' ?
  'ws://localhost:3001' :
  window.location.origin.replace(/^http/, 'ws');

const SocketService = {
  socket: undefined,
  connect
};

connect = connect.bind(SocketService);

export function connect(onopen) {
  const socket = new WebSocket(host);

  socket.onopen = () => {
    setTimeout(() => sendInit());
  };

  socket.onmessage = (message) => {
    message = JSON.parse(message.data);
    console.log('message: ', message)

    switch (message.type) {
      case INIT:
        const channels = message.data.channels;
        const online = message.data.online;
        const username = message.data.username;
        store.dispatch(setChannels(channels));
        store.dispatch(changeChannel(channels[0].id));
        store.dispatch(setOnline(online));
        store.dispatch(setUsername(username));
        if (typeof onopen === 'function') {
          onopen();
        }
        break;
      case NEW_MESSAGE:
        store.dispatch(addMessage({
          channelId: message.data.channelId,
          message: message.data.message
        }));
        break;
      case NEW_CHANNEL:
        const channel = Object.assign(message.data.channel, {isTyping: false});
        store.dispatch(addChannel(channel));
        break;
      case TYPING:
        setTypingAsync({channelId: message.data.channelId, isTyping: true});
        break;
      case ONLINE:
        store.dispatch(setOnline(message.data.online));
        break;
      case BAD_TOKEN:
        store.dispatch(setToken(undefined));
        break;
      default:
        console.error('Unknown message type: ', message.type);
    }
  }

  socket.onclose = () => {
    store.dispatch(setReconnecting(true));
    this.connect(() => store.dispatch(setReconnecting(false)));
  }

  this.socket = socket;
}

export default SocketService;
