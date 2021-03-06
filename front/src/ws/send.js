import SocketService from "./socket";
import store from '../state/store';

export default function send(type, data) {
  if(SocketService.socket.readyState !== SocketService.socket.OPEN) return console.error('socket is connecting')
  const token = store.getState().token;
  SocketService.socket.send(JSON.stringify({type, data, token}));
}
