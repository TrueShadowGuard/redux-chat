import {ADD_CHANNEL} from "./ws_types";
import socket from "./socket";

export default function createChannel(name) {
  socket.send(JSON.stringify({type: ADD_CHANNEL, data: {name}}));
}
