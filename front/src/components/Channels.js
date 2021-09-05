import React, {useMemo} from 'react';
import s from "../styles/asidePanel.module.css";
import Channel from "./Channel";
import {useSelector} from "react-redux";

const Channels = () => {
  const channels = useSelector(state => state.channels);
  const messageFilter = useSelector(state => state.messageFilter);
  const filteredChannels = useMemo(() => {
    return channels.filter(c => {
      return c.name.toUpperCase().includes(messageFilter.toUpperCase());
    });
  }, [channels.length, messageFilter]);

  return (
    <ul className={s.channels}>
      {filteredChannels.map((channel => (
            <Channel name={channel.name}
                     id={channel.id}
                     key={channel.id}
            />
          )
        )
      )}
    </ul>
  );
};

export default Channels;
