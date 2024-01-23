import React, { useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaRegUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  showDetails,
  displayChatsPage,
  filteredContacts,
  readMessages,
  setCounterZero,
} from '../store/ContactsSlice';

const List = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.ContactsSlice.email);
  const phoneNumber = useSelector((state) => state.ContactsSlice.phoneNumber);
  const contacts = useSelector((state) => state.ContactsSlice.contacts);
  const darked = useSelector((state) => state.ContactsSlice.darked);

  const searchInput = useRef(null);

  // click on one contact
  const selectContact = (contact) => {
    dispatch(displayChatsPage());
    dispatch(showDetails(contact));
  };

  // selected contact style

  const [selectedContact, setSelected] = useState(false);

  // read messages notification

  const readMessagesHandler = (elem) => {
    const data = {
      email: email, // for live update
      phone: phoneNumber,
      contactNumber: elem.phoneNumber,
      status: false,
    };
    dispatch(readMessages(data));
    dispatch(setCounterZero(data));
  };

  return (
    <>
      <div className="input-container">
        <div
          className="input-search"
          style={
            darked ? { boxShadow: 'inset 5px 5px 3px rgb(28, 28, 57)' } : null
          }
        >
          <FiSearch className="search-icon" />
          <input
            type="text"
            ref={searchInput}
            placeholder="search..."
            onChange={() => {
              dispatch(filteredContacts(searchInput.current.value));
              setSelected(false);
            }}
            style={darked ? { color: 'rgb(241, 241, 241)' } : null}
          />
        </div>
      </div>
      <div className="contacts">
        {contacts.length !== 0 ? (
          contacts.map((elem, index) => (
            <div
              key={elem._id}
              className={
                darked
                  ? 'contact-field-dark'
                  : selectedContact === index
                  ? 'contact-field-selected'
                  : 'contact-field'
              }
              onClick={() => {
                selectContact(elem);
                setSelected(index);
                readMessagesHandler(elem);
              }}
            >
              <div className="contact-profile-pic icon-container">
                <FaRegUser className="profile-icon" />
              </div>
              <div className="contact-name">
                {elem.name} <br />
                <span>
                  {elem.chat.length
                    ? elem.chat[elem.chat.length - 1].message
                    : null}
                </span>
              </div>
              {elem.newMessage ? (
                selectedContact === index ? null : (
                  <div className="recent-message">{elem.countMessage}</div>
                )
              ) : null}

              <div className="time-chat">
                {elem.chat.length ? elem.chat[elem.chat.length - 1].time : null}
              </div>
            </div>
          ))
        ) : (
          <div
            style={{ width: '350px', textAlign: 'center', fontSize: '18px' }}
          >
            You have no Contacts
          </div>
        )}
      </div>
    </>
  );
};

export default List;
