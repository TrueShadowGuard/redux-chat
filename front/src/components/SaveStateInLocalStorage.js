import React from 'react';
import store, {subscribe} from "../state/store";
import {connect} from '../ws/socket';

class SaveStateInLocalStorage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const paths = this.props.paths;

    const savedStorePart = JSON.parse(localStorage.getItem('redux')) || {};
    savedStorePart.userId = store.getState().userId;
    localStorage.setItem('redux', JSON.stringify(savedStorePart))

    const subscribers = paths.map(path => {
      return subscribe(path, state => {
        const savedStorePart = JSON.parse(localStorage.getItem('redux')) || {};
        savedStorePart[path] = state[path];
        localStorage.setItem('redux', JSON.stringify(savedStorePart));
      })
    });
    connect();
  }

  render() {
    return this.props.children;
  }
}

export default SaveStateInLocalStorage;
