export function selectChannel(state) {
  const id = state.selectedChannelId;
  return state.channels.find(c => c.id === id);
}

export function selectUserId(state) {
  return state.userId;
}

export function selectSelectedChannelID(state) {
  return state.selectedChannelId;
}

export function selectOnline(state) {
  return state.online;
}
