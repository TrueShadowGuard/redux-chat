import {ADD_MESSAGE} from "./consts";
import store from "../state/store";
import send from './send';

export default function (channelId, text) {
  send(ADD_MESSAGE,
    {
      channelId,
      message: {
        text,
        date: new Date().toTimeString().split(' ')[0],
      }
    }
  );
}
