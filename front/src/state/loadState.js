export default function loadState() {
  const defaultState = {
    isDarkTheme: false,
    isAutoTheme: false,
    username: '',
    online: 0,
    userId: Math.random(),
    isConnected: false,
    channels: [],
    selectedChannelId: undefined,
    messageFilter: '',
    filteredChannels: []
  }
  const localStorageState = JSON.parse(localStorage.getItem('redux'));
  Object.assign(defaultState, localStorageState);
  return defaultState;
}
