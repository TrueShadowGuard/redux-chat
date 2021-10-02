import {INIT} from "./consts";
import send from "./send";

export default function sendInit() {
  send(INIT, {});
}
