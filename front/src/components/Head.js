import React, {useMemo, useRef} from 'react';
import ReactDOM from 'react-dom';
import {useSelector} from "react-redux";

const Head = () => {
  const isDarkTheme = useSelector(state => state.isDarkTheme);

  const styleHTML = useMemo(() => {
    const res = {};
    if(isDarkTheme) {
      res['--primary'] = '#333';
      res['--secondary'] = '#aaa';
    } else {
      res['--primary'] = '#3288dd';
      res['--secondary'] = 'white';
    }
    return getHTML(res);
  }, [isDarkTheme])

  return ReactDOM.createPortal(
    <>
      <style>{styleHTML}</style>
    </>, document.head
  )

  function getHTML(properties) {
    const props = Object.entries(properties).map(([name, val]) => `${name}: ${val};`).join('');
    return `:root {${props}}`;
  }
};

export default Head;
