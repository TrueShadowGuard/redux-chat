import {subscribe} from './store';

const paths = ['isDarkTheme', 'username', 'userId'];

paths.forEach(path => {
  subscribe(path, state => {
    const savedStorePart = JSON.parse(localStorage.getItem('redux')) || {};
    savedStorePart[path] = state[path]
    localStorage.setItem('redux', JSON.stringify(savedStorePart));
  })
});

console.log('localStorageSave');


