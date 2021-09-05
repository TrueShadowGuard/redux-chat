import socket from "./socket";

export default function send(type, data) {
  socket.send(JSON.stringify({type, data}));
}
