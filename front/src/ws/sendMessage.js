import {ADD_MESSAGE} from "./ws_types";
import store from "../state/store";
import send from './send';

export default function (channelId, text) {
  send(ADD_MESSAGE,
    {
      channelId,
      message: {
        text,
        author: store.getState().username
      }
    }
  );
}
