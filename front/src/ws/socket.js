import {addChannel, addMessage, changeChannel, setChannels} from "../state/reducer";
import store from "../state/store";
import {INIT, NEW_CHANNEL, NEW_MESSAGE} from "./ws_types";


let host;
if (process.env.NODE_ENV === 'development') {
  host = 'ws://localhost:8080';
} else {
  host = window.location.origin.replace(/^http/, 'ws');
}

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
      store.dispatch(addChannel(message.data.channel));
      break;
    default:
      console.error('Unknown message type: ', message.type);
  }
}

export default socket;
