import {addChannel, addMessage, changeChannel, setChannels, setTyping} from "../state/reducer";
import store from "../state/store";
import {INIT, NEW_CHANNEL, NEW_MESSAGE, TYPING} from "./ws_types";
import {setTypingAsync} from "../state/async";

const host = process.env.NODE_ENV === 'development' ?
  'ws://localhost:8080' :
  window.location.origin.replace(/^http/, 'ws');

const socket = new WebSocket(host);

socket.onmessage = (message) => {
  message = JSON.parse(message.data);
  console.log('message: ', message)

  switch (message.type) {
    case INIT:
      store.dispatch(setChannels(message.data));
      store.dispatch(changeChannel(message.data[0].id));
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
    default:
      console.error('Unknown message type: ', message.type);
  }
}

export default socket;
