import store from "./store";
import {setTyping} from "./reducer";

export function setTypingAsync(payload) {
  store.dispatch(setTyping(payload));
  if(payload.isTyping === true) {
    if(setTypingTimeout !== null) clearTimeout(setTypingTimeout);
    setTypingTimeout = setTimeout(() => {
      store.dispatch(setTyping({...payload, isTyping: false}));
    }, 1000);
  }
}

let setTypingTimeout = null;
