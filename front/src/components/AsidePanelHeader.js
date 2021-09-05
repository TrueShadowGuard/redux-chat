import React, {useState} from 'react';
import s from "../styles/asidePanel.module.css";
import loupe from "../images/loupe.svg";
import {setChannelsFilter} from "../state/reducer";
import plus from "../images/plus.svg";
import {useDispatch} from "react-redux";
import createChannel from "../ws/createChannel";
import InputDialog from "./InputDialog";

const AsidePanelHeader = () => {
  const dispatch = useDispatch();
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  return (
    <>
      <InputDialog open={isDialogOpened} setOpen={setIsDialogOpened}
                   submitCallback={channelName => channelName && createChannel(channelName)}/>
      <header className={s.header}>
        <img src={loupe}
             alt=""
             width={20}
             height={20}
        />
        <input type="text"
               placeholder="Search"
               className={s.search}
               onChange={e => dispatch(setChannelsFilter(e.target.value))}
        />
        <img src={plus}
             alt=""
             width={20}
             height={20}
             className={s.createChannelButton}
             onClick={() => setIsDialogOpened(true)}
             title="Create new channel"
        />
      </header>
    </>
  );
};

export default AsidePanelHeader;
