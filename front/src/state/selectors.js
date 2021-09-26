export function selectChannel(state) {
  const id = state.selectedChannelId;
  return state.channels.find(c => c.id === id);
}
