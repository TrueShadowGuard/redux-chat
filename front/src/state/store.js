import {configureStore} from '@reduxjs/toolkit';
import reducer from "./reducer";
import initSubscriber from 'redux-subscriber';


const logger = store => next => action => {
  console.log(action)
  next(action);
}

const thunk = store => next => action => {

  if (typeof action === 'function') {
    action(next);
  } else {
    next(action);
  }
}

const store = configureStore({
  reducer,
  middleware: [logger, thunk]
});

export const subscribe = initSubscriber(store);

export default store;


