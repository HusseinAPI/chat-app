import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CiSettings } from 'react-icons/ci';
import { MdMessage } from 'react-icons/md';
import { FiPhoneCall } from 'react-icons/fi';
import { IoAddCircle } from 'react-icons/io5';
import { FaRegUser } from 'react-icons/fa';
import { chatPage } from '../store/ContactsSlice';
import { useDispatch, useSelector } from 'react-redux';

const Navigation = () => {
  const dispatch = useDispatch();
  const selectChat = useSelector((state) => state.ContactsSlice.selectChat);

  const [selected, setSelected] = useState({
    settings: false,
    chats: false,
    calls: false,
    add: false,
    profile: false,
  });

  useEffect(() => {
    setSelected({
      settings: false,
      chats: selectChat ? true : false,
      calls: false,
      add: selectChat ? false : null,
      profile: false,
    });
  }, [selectChat]);

  return (
    <div className="navigation">
      <div className="pages">
        <NavLink to="settings">
          <div
            className={
              selected.settings ? 'icon-container-select' : 'icon-container'
            }
            onClick={() => {
              setSelected(() => ({
                settings: true,
                chats: false,
                calls: false,
                add: false,
                profile: false,
              }));
            }}
          >
            <CiSettings className="settings-nav-icon " />
          </div>
        </NavLink>
        <NavLink to="/">
          <div
            className={
              selected.chats ? 'icon-container-select' : 'icon-container'
            }
            onClick={() => {
              setSelected(() => ({
                settings: false,
                chats: true,
                add: false,
                profile: false,
              }));
            }}
          >
            <MdMessage className="chat-icon" />
          </div>
        </NavLink>
        <NavLink to="calls">
          <div
            className={
              selected.calls ? 'icon-container-select' : 'icon-container'
            }
            onClick={() => {
              setSelected(() => ({
                settings: false,
                chats: false,
                calls: true,
                add: false,
                profile: false,
              }));
            }}
          >
            <FiPhoneCall className="call-icon" />
          </div>
        </NavLink>
        <NavLink to="add">
          <div
            className={
              selected.add ? 'icon-container-select' : 'icon-container'
            }
            onClick={() => {
              dispatch(chatPage(false));
              setSelected(() => ({
                settings: false,
                chats: false,
                calls: false,
                add: true,
                profile: false,
              }));
            }}
          >
            <IoAddCircle className="add-icon" />
          </div>
        </NavLink>
        <NavLink to="myprofile" className="profile-pic">
          <div
            className={
              selected.profile ? 'icon-container-select' : 'icon-container'
            }
            onClick={() => {
              setSelected(() => ({
                settings: false,
                chats: false,
                calls: false,
                add: false,
                profile: true,
              }));
            }}
          >
            <FaRegUser className="profile-icon" />
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
