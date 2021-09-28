import {subscribe} from './store';
import store from './store';

const paths = ['isDarkTheme', 'username', 'userId'];

const savedStorePart = JSON.parse(localStorage.getItem('redux')) || {};
savedStorePart.userId = store.getState().userId;
localStorage.setItem('redux', JSON.stringify(savedStorePart))

paths.forEach(path => {
  subscribe(path, state => {
    const savedStorePart = JSON.parse(localStorage.getItem('redux')) || {};
    savedStorePart[path] = state[path];
    localStorage.setItem('redux', JSON.stringify(savedStorePart));
  })
});


