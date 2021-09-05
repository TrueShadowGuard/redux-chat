import timeObserver from "./timeObserver";
import store from "../state/store";
import {setIsDarkTheme} from "../state/reducer";

const style = document.createElement('style');


const properties = new Proxy({}, {
  set(target, name, value, properties) {
    target[name] = value;
    style.innerHTML = getHTML(properties);
    return true;
  }
});

function getHTML(properties) {
  const props = Object.entries(properties).map(([name, val]) => `${name}: ${val};`).join('');
  return `:root {${props}}`;
}

style.innerHTML = getHTML(properties);
document.head.appendChild(style);

const autoDarkTheme = (date) => {
  if (date.getHours() >= 21 || date.getHours() < 6) {
    store.dispatch(setIsDarkTheme(true));
  } else {
    store.dispatch(setIsDarkTheme(false));
  }
};

export const setDarkTheme = () => {
  properties['--primary'] = '#333';
  properties['--secondary'] = '#aaa';
}

export const setStandardTheme = () => {
  properties['--primary'] = '#3288dd';
  properties['--secondary'] = 'white';
}

export const setAutoDarkTheme = (isAuto) => {
  if(isAuto) {
    timeObserver.subscribe(autoDarkTheme);
  } else {
    timeObserver.unsubscribe(autoDarkTheme);
  }
}
