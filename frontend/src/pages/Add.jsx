import React, { useRef } from 'react';
import { FaUser } from 'react-icons/fa';
import { IoIosPhonePortrait } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { chatPage, addContact } from '../store/ContactsSlice';

const Add = () => {
  const email = useSelector((state) => state.ContactsSlice.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = useRef(null);
  const phoneNumber = useRef(null);

  const addContactData = () => {
    const contactData = {
      email: email, // for select user
      id: Date.now(),
      name: name.current.value,
      phoneNumber: phoneNumber.current.value,
      lastSeen: '',
      chat: [],
    };
    if (contactData.name.length !== 0 && contactData.phoneNumber.length !== 0) {
      dispatch(addContact(contactData));
      dispatch(chatPage(true));
      navigate('/');
      name.current.value = '';
      phoneNumber.current.value = '';
    }
  };
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          backgroundColor: 'rgb(184, 227, 119)',
          height: '305px',
          position: 'relative',
        }}
      >
        <img
          src={require('../ContactPic.png')}
          alt=""
          style={{ position: 'absolute', top: '65px' }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          height: '340px',
          padding: '20px',
        }}
      >
        <div className="title">Add Contact</div>
        <div className="field-input-container">
          <div className="field-input">
            <FaUser className="user" />
            <input type="text" placeholder="Name" ref={name} />
          </div>
        </div>
        <div className="field-input-container">
          <div className="field-input">
            <IoIosPhonePortrait className="phone-number" />
            <input type="text" placeholder="Phone number" ref={phoneNumber} />
          </div>
        </div>
        <div className="field-input-container">
          <button onClick={() => addContactData()}>Add to Contacts</button>
        </div>
      </div>
    </>
  );
};

export default Add;
