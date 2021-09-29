import send from "./send";
import {TYPING} from "./consts";

export default function sendTyping(channelId) {
  send(TYPING, {channelId})
}
