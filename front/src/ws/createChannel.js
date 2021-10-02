import {ADD_CHANNEL} from "./consts";
import send from "./send";

export default function createChannel(name) {
  send(ADD_CHANNEL, {name});
}
