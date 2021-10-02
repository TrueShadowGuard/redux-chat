import SocketService from "./socket";
import store from '../state/store';

export default function send(type, data) {
  const token = store.getState().token;
  SocketService.socket.send(JSON.stringify({type, data, token}));
}
