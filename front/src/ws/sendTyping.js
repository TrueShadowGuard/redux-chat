import send from "./send";
import {TYPING} from "./consts";

export default function sendTyping(channelId, token) {
  send(TYPING, {channelId}, token)
}
