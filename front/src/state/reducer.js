import {createAction, createReducer} from "@reduxjs/toolkit";
import loadState from "./loadState";
import {MAX_MESSAGES_IN_CHANNEL} from "../ws/consts";

export const changeChannel = createAction('CHANGE_CHANNEL');
export const addMessage = createAction('ADD_MESSAGE');
export const setChannels = createAction('SET_CHANNELS');
export const setChannelsFilter = createAction('SET_CHANNELS_FILTER');
export const addChannel = createAction('ADD_CHANNEL');
export const setUsername = createAction('SET_USERNAME');
export const setIsDarkTheme = createAction('SET_IS_DARK_THEME');
export const setIsAutoTheme = createAction('SET_AUTO_THEME');
export const setTyping = createAction('SET_TYPING');
export const setOnline = createAction('SET_ONLINE');
export const setReconnecting = createAction('SET_RECONNECTING');
export const setToken = createAction('SET_TOKEN');
export const setIsAsideOpen = createAction('SET_IS_ASIDE_OPEN');

let preloadedState = loadState();

let reducer = createReducer(preloadedState, {
  [changeChannel]: (state, action) => {
    state.selectedChannelId = action.payload;
  },
  [addMessage]: (state, action) => {
    const channel = state.channels.find(c => c.id === action.payload.channelId);
    channel.messages.push(action.payload.message);
    if(channel.messages.length > MAX_MESSAGES_IN_CHANNEL) {
      channel.messages.splice(0, channel.messages.length - MAX_MESSAGES_IN_CHANNEL);
    }
  },
  [setChannels]: (state, action) => {
    const channels = action.payload;
    state.channels = channels;
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
  },
  [setTyping]: (state, action) => {
    state.channels.find(c => c.id === action.payload.channelId).isTyping = action.payload.isTyping;
  },
  [setOnline]: (state, action) => {
    state.online = action.payload;
  },
  [setReconnecting]: (state, action) => {
    state.isReconnecting = action.payload;
  },
  [setToken]: (state, action) => {
    state.token = action.payload;
  },
  [setIsAsideOpen]: (state, action) => {
    state.isAsideOpen = action.payload;
  }
});

export default reducer;
