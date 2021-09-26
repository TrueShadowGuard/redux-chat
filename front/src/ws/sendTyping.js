import send from "./send";
import {TYPING} from "./ws_types";

export default function sendTyping(channelId) {
  send(TYPING, {channelId})
}
