import React, {useRef, useState} from 'react';
import SettingsDropdown from "./SettingsDropdown";
import s from '../styles/settings.module.css';

const Settings = () => {
  const containerRef = useRef();
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div ref={containerRef} className={s.settingsContainer}>
        <i className={`fa fa-cog ${s.settingsButton}`}
           style={{color: 'var(--secondary)'}}
           onClick={() => setOpen(!open)}
        />
        <SettingsDropdown parentRef={containerRef} open={open}/>
      </div>
    </div>
  );
};

export default Settings;
