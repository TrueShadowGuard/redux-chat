import {createAction, createReducer} from "@reduxjs/toolkit";
import loadState from "./loadState";

export const changeChannel = createAction('CHANGE_CHANNEL');
export const addMessage = createAction('ADD_MESSAGE');
export const setChannels = createAction('SET_CHANNELS');
export const setChannelsFilter = createAction('SET_CHANNELS_FILTER');
export const addChannel = createAction('ADD_CHANNEL');
export const setUsername = createAction('SET_USERNAME');
export const setIsDarkTheme = createAction('SET_IS_DARK_THEME');;
export const setIsAutoTheme = createAction('SET_AUTO_THEME');


let preloadedState = loadState();

const reducer = createReducer(preloadedState, {
  [changeChannel]: (state, action) => {
    state.selectedChannelId = action.payload;
  },
  [addMessage]: (state, action) => {
    const channel = state.channels.find(c => c.id === action.payload.channelId);
    channel.messages.push(action.payload.message);
  },
  [setChannels]: (state, action) => {
    state.channels = action.payload;
  },
  [setChannelsFilter]: (state, action) => {
    state.messageFilter = action.payload;
  },
  [addChannel]: (state, action) => {
    state.channels.push(action.payload);
  },
  [setUsername]: (state, action) => {
    state.username = action.payload;
  },
  [setIsDarkTheme]: (state, action) => {
    state.isDarkTheme = action.payload;
  },
  [setIsAutoTheme]: (state, action) => {
    state.isAutoTheme = action.payload;
  }
});

export default reducer;
