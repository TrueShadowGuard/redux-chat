import {configureStore} from '@reduxjs/toolkit';
import reducer from "./reducer";
import {setAutoDarkTheme, setDarkTheme, setStandardTheme} from "../utils/__css";
import initSubscriber from 'redux-subscriber';


const logger = store => next => action => {
  console.log(action)
  next(action);
}

const store = configureStore({
  reducer,
  middleware: [logger]
});

export const subscribe = initSubscriber(store);

subscribe('isDarkTheme', state => {
  if (state.isDarkTheme) {
    setDarkTheme();
  } else {
    setStandardTheme();
  }
});

subscribe('isAutoTheme', state => {
  setAutoDarkTheme(state.isAutoTheme);
});


export default store;


