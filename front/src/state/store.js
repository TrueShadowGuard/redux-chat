import {configureStore} from '@reduxjs/toolkit';
import reducer from "./reducer";
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

export default store;

window.store = store;


