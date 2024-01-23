import React from 'react';
import { MdOutlineVpnKey } from 'react-icons/md';
import { IoMoon } from 'react-icons/io5';
import { MdOutlineWallpaper } from 'react-icons/md';
import { MdOutlineBackup } from 'react-icons/md';
import { GrDocumentTransfer } from 'react-icons/gr';
import { FaHistory } from 'react-icons/fa';
import { MdNotifications } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { openChangedList, resetBackground } from '../store/ContactsSlice';
import { logOut } from '../store/AuthSlice';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darked = useSelector((state) => state.ContactsSlice.darked);
  return (
    <>
      <div className={darked ? 'settings-field-dark' : 'settings-field'}>
        <MdOutlineVpnKey className="settings-icon" />
        <div>Accounts</div>
      </div>
      <div className={darked ? 'settings-field-dark' : 'settings-field'}>
        <MdNotifications className="settings-icon" />
        <div>Notifications</div>
      </div>
      <div
        className={darked ? 'settings-field-dark' : 'settings-field'}
        onClick={() => {
          dispatch(openChangedList(true));
        }}
      >
        <IoMoon className="settings-icon" />
        <div>Theme</div>
      </div>

      <div className={darked ? 'settings-field-dark' : 'settings-field'}>
        <MdOutlineWallpaper className="settings-icon" />
        <div>Wallpaper</div>
      </div>
      <div className={darked ? 'settings-field-dark' : 'settings-field'}>
        <MdOutlineBackup className="settings-icon" />
        <div>Chat backup</div>
      </div>
      <div className={darked ? 'settings-field-dark' : 'settings-field'}>
        <GrDocumentTransfer className="settings-icon" />
        <div>Transfer chats</div>
      </div>
      <div className={darked ? 'settings-field-dark' : 'settings-field'}>
        <FaHistory className="settings-icon" />
        <div>Chat history</div>
      </div>
      <div
        className={darked ? 'settings-field-dark' : 'settings-field'}
        onClick={() => {
          dispatch(logOut());
          dispatch(resetBackground());
          navigate('/');
        }}
      >
        <FaHistory className="settings-icon" />
        <div>Log Out</div>
      </div>
    </>
  );
};

export default Settings;
