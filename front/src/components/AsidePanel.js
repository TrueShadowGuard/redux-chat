import React, {useMemo, useRef, useState} from 'react';
import s from '../styles/asidePanel.module.css';
import Channels from "./Channels";
import AsidePanelHeader from "./AsidePanelHeader";

import Personal from "../images/personal.svg";
import Channel from "../images/channel.svg";
import {IconButton, Tooltip, useMediaQuery} from "@material-ui/core";
import {selectIsAsideOpen} from "../state/selectors";
import {useDispatch, useSelector} from "react-redux";
import {setIsAsideOpen} from "../state/reducer";

const AsidePanel = () => {
  const isAsideOpen = useSelector(selectIsAsideOpen);
  const dispatch = useDispatch();

  const asideRef = useRef();

  const isSmallScreen = useMediaQuery("@media screen and (max-width: 500px");

  const tabs = [
    {
      id: "channels", component: (<>
        <AsidePanelHeader/>
        <Channels/>
      </>)
    },
    {
      id: "personal", component: (
        <div>
          Personal messages
        </div>
        )
    }
  ]
  const [selectedTabId, setSelectedTabId] = useState("channels");
  const selectedTab = tabs.find(tab => tab.id === selectedTabId).component;
  const setTab = (tabId) => {
    setSelectedTabId(tabId);
    dispatch(setIsAsideOpen(true));
  }

  return (
    <aside className={s.asidePanel + ((isSmallScreen && isAsideOpen) ? ` ${s.fullWidth}` : "")}>
      <div className={s.nav}>
        <Tooltip title="Channels" placement="right">
          <IconButton onClick={() => setTab("channels")}>
            <i className="fa fa-users"/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Personal messages" placement="right">
          <IconButton onClick={() => setTab("personal")}>
            <i className="fa fa-user"/>
          </IconButton>
        </Tooltip>
      </div>
        {isAsideOpen ? (
          <div className={s.content}>
            <div className={s.close} onClick={closeAside}/>
            {selectedTab}
          </div>
        ) : null}
    </aside>
  );

  function openAside() {
    dispatch(setIsAsideOpen(true));
  }

  function closeAside() {
    dispatch(setIsAsideOpen(false));
  }

};

export default AsidePanel;
