import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Background from '../components/Background';
import ContactChat from '../components/ContactChat';
import { openChangedList } from '../store/ContactsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Theme from '../components/Theme';
import Log from '../components/login/Log';

const RootLayout = () => {
  const chatsField = useSelector((state) => state.ContactsSlice.chatsField);
  const darked = useSelector((state) => state.ContactsSlice.darked);
  const changed = useSelector((state) => state.ContactsSlice.changed);
  const registered = useSelector((state) => state.AuthSlice.registered);

  const dispatch = useDispatch();

  return registered ? (
    <div
      className="container"
      style={darked ? { backgroundColor: ' rgb(55, 55, 96)' } : null}
    >
      <div
        className="chat-list"
        style={darked ? { backgroundColor: ' rgb(55, 55, 96)' } : null}
      >
        <Outlet />
      </div>
      <div
        className={chatsField ? null : 'background-container'}
        style={
          darked
            ? {
                backgroundColor: ' rgb(55, 55, 96)',
              }
            : null
        }
      >
        {chatsField ? <ContactChat /> : <Background />}
      </div>
      <Navigation />
      {changed ? (
        <>
          <Theme />
          <div
            className="back-block"
            onClick={() => dispatch(openChangedList(false))}
          ></div>
        </>
      ) : null}
    </div>
  ) : (
    <Log />
  );
};

export default RootLayout;
