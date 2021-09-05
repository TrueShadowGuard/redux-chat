import React, {useRef, useState} from 'react';
import s from '../styles/asidePanel.module.css';
import Channels from "./Channels";
import AsidePanelHeader from "./AsidePanelHeader";

const AsidePanel = () => {
  const [isAsideOpened, setIsAsideOpened] = useState(true);
  const asideRef = useRef();

  return (
    <aside className={s.asidePanel} ref={asideRef}>
      <AsidePanelHeader />
      {isAsideOpened && <div className={s.close} onClick={closeAside}/>}
      {!isAsideOpened && <div className={s.open} onClick={openAside}/>}
      <Channels/>
    </aside>
  );

  function openAside() {
    setIsAsideOpened(true);
    asideRef.current.style.marginLeft = 0 + 'px';
  }

  function closeAside() {
    const w = asideRef.current.offsetWidth;
    asideRef.current.style.marginLeft = (-w) + 'px';
    setTimeout(() => {
      setIsAsideOpened(false);
    }, 200);
  }
};

export default AsidePanel;
