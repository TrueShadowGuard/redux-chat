import {configureStore} from '@reduxjs/toolkit';
import reducer from "./reducer";
import {setAutoDarkTheme, setDarkTheme, setStandardTheme} from "../utils/__css";

const store = configureStore({
  reducer,
});

store.subscribe(() => {
  const state = store.getState();
  if(state.isDarkTheme) {
    setDarkTheme();
  } else {
    setStandardTheme();
  }
  setAutoDarkTheme(state.isAutoTheme);
})

export default store;


