import {
  addChannel,
  addMessage,
  changeChannel,
  setChannels,
  setOnline,
  setReconnecting,
  setTyping
} from "../state/reducer";
import store from "../state/store";
import {INIT, NEW_CHANNEL, NEW_MESSAGE, ONLINE, TYPING} from "./consts";
import {setTypingAsync} from "../state/async";

const host = process.env.NODE_ENV === 'development' ?
  'ws://localhost:3001' :
  window.location.origin.replace(/^http/, 'ws');

let socket = connect(host);

function connect(host, onopen) {
  const websocket = new WebSocket(host);
  if (typeof onopen === 'function') {
    websocket.onopen = onopen;
  }

  websocket.onmessage = (message) => {
    message = JSON.parse(message.data);
    console.log('message: ', message)

    switch (message.type) {
      case INIT:
        const channels = message.data.channels;
        const online = message.data.online;
        store.dispatch(setChannels(channels));
        store.dispatch(changeChannel(channels[0].id));
        store.dispatch(setOnline(online));
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
      default:
        console.error('Unknown message type: ', message.type);
    }
  }

  websocket.onclose = () => {
    socket = connect(host, () => store.dispatch(setReconnecting(false)));
    store.dispatch(setReconnecting(true));
  }

  return websocket;
}

export default socket;

window.socket = socket;
