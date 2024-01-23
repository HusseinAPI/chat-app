import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaRegUser, FaSmileBeam } from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
import { IoVideocamOutline, IoSend, IoCameraOutline } from 'react-icons/io5';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoIosAttach, IoIosArrowDown } from 'react-icons/io';
import { FaMicrophone } from 'react-icons/fa6';
import {
  chatStorage,
  deleteMessage,
  readMessages,
  receivedChats,
  resetBackground,
  setCounterMessages,
} from '../store/ContactsSlice';
import { logOut } from '../store/AuthSlice';

const ContactChat = () => {
  const phoneNumber = useSelector((state) => state.ContactsSlice.phoneNumber);
  const email = useSelector((state) => state.ContactsSlice.email);
  const contactInfo = useSelector((state) => state.ContactsSlice.contactInfo);
  const messageCounter = useSelector(
    (state) => state.ContactsSlice.messageCounter
  );
  const darked = useSelector((state) => state.ContactsSlice.darked);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const time = `${new Date().getHours()}:${
    new Date().getMinutes() < 10
      ? '0' + new Date().getMinutes()
      : new Date().getMinutes()
  }`;

  // message Options

  const [showOptButton, setOptButton] = useState(null);
  const [optionList, setOptList] = useState(null);

  // contact Options
  const [contactOption, setContactOpt] = useState(null);

  // Send Message

  const [insertMessage, setMessage] = useState('');
  const inputValue = useRef(null);

  const sendMessage = () => {
    const sendData = {
      phone: phoneNumber,
      email: email, // for dispatch getContacts
      contactPhone: contactInfo.phoneNumber, // for select contact
      id: Date.now(),
      message: insertMessage,
      time: time,
      received: false,
    };

    const receivedData = {
      phone: phoneNumber,
      email: email, // for dispatch getContacts
      contactPhone: contactInfo.phoneNumber, // for select contact
      id: Date.now(),
      message: insertMessage,
      time: time,
      received: true,
    };

    const data = {
      email: email, // for live update
      phone: contactInfo.phoneNumber,
      contactNumber: phoneNumber,
      status: true,
      countMessage: messageCounter.length,
    };
    dispatch(chatStorage(sendData));
    dispatch(receivedChats(receivedData));
    dispatch(readMessages(data));
    dispatch(setCounterMessages(data));
    inputValue.current.value = '';
  };

  // Delete message

  const deleteHandler = (item) => {
    const data = {
      phone: phoneNumber,
      email: email, // for dispatch getContacts
      contactPhone: contactInfo.phoneNumber, // for select contact
      messageId: item.id,
      message: item.message,
      time: item.time,
    };
    dispatch(deleteMessage(data));
  };

  return (
    <>
      <div
        className="header"
        style={darked ? { backgroundColor: 'transparent' } : null}
      >
        <div className="prof-and-name">
          <div className="contact-profile-pic icon-container">
            <FaRegUser className="profile-icon" />
          </div>
          <div
            className="contact-name-header"
            style={darked ? { color: 'rgb(241, 241, 241)' } : null}
          >
            {contactInfo.name} <br />
          </div>
        </div>
        <div className="header-option">
          <FiPhoneCall
            className="header-phone"
            style={darked ? { color: 'rgb(241, 241, 241)' } : null}
          />
          <IoVideocamOutline
            className="header-video"
            style={darked ? { color: 'rgb(241, 241, 241)' } : null}
          />
          <BsThreeDotsVertical
            className="three-dot"
            style={darked ? { color: 'rgb(241, 241, 241)' } : null}
            onClick={() => setContactOpt(!contactOption)}
          />
          {contactOption ? (
            <div
              className="three-dot-options"
              onMouseLeave={() => setContactOpt(false)}
            >
              <div className="dot-option">clear chats</div>
              <div className="dot-option">block</div>
              <div
                className="dot-option"
                onClick={() => {
                  dispatch(logOut());
                  dispatch(resetBackground());
                  navigate('/');
                }}
              >
                Log out
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {darked ? (
        <div
          style={{ height: '1px', backgroundColor: 'rgb(75, 171, 255)' }}
        ></div>
      ) : null}
      <div
        className="messages-container"
        onMouseLeave={() => setOptList(false)}
      >
        {contactInfo.chat.map((elem, index) => (
          <>
            <div
              className={elem.received ? 'received-message' : 'message'}
              key={index}
              onMouseEnter={() => setOptButton(index)}
              onMouseLeave={() => setOptButton(null)}
            >
              {elem.message}
              <span
                style={
                  elem.received
                    ? {
                        color: 'rgb(255, 0, 0)',
                        fontSize: '14px',
                        marginLeft: '5px',
                      }
                    : {
                        color: 'rgb(184, 227, 119)',
                        fontSize: '14px',
                        marginLeft: '5px',
                      }
                }
              >
                {elem.time}
              </span>
              {index === showOptButton ? (
                <div
                  className="message-options-button-on"
                  onClick={() => {
                    setOptList(index);
                  }}
                >
                  <IoIosArrowDown />
                </div>
              ) : null}
              {index === optionList ? (
                <div
                  className="message-options-list"
                  onClick={() => setOptList(null)}
                  onMouseLeave={() => setOptList(false)}
                >
                  <div className="option" onClick={() => deleteHandler(elem)}>
                    Delete
                  </div>
                  <div className="option">Reply</div>
                  <div className="option">Forward</div>
                  <div className="option">Report</div>
                </div>
              ) : null}
            </div>
            <br />
            <br />
            <br />
          </>
        ))}
      </div>
      {darked ? (
        <div
          style={{ height: '1px', backgroundColor: 'rgb(75, 171, 255)' }}
        ></div>
      ) : null}
      <div
        className="insert-message-nav"
        style={darked ? { backgroundColor: 'transparent' } : null}
      >
        <div className="insert-first-div">
          <IoIosAttach
            className="attach"
            style={darked ? { color: 'rgb(241, 241, 241)' } : null}
          />
          {insertMessage.length !== 0 && inputValue.current.value !== '' ? (
            <IoSend className="send" onClick={() => sendMessage()} />
          ) : null}
          <input
            type="text"
            placeholder="Type your message here"
            ref={inputValue}
            style={darked ? { color: 'rgb(241, 241, 241)' } : null}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </div>
        <div className="insert-second-div">
          <IoCameraOutline
            className="camera"
            style={darked ? { color: 'rgb(241, 241, 241)' } : null}
          />
          <FaMicrophone
            className="mic"
            style={darked ? { color: 'rgb(241, 241, 241)' } : null}
          />
          <FaSmileBeam
            className="emoji"
            style={darked ? { color: 'rgb(241, 241, 241)' } : null}
          />
        </div>
      </div>
    </>
  );
};
export default ContactChat;
