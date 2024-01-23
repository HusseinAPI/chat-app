import React from 'react';
import { FaUser } from 'react-icons/fa';
import { IoIosPhonePortrait } from 'react-icons/io';
import { MdAttachEmail } from 'react-icons/md';
import { FaUnlock } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';

const Signup = ({
  changePage,
  username,
  phoneNumber,
  email,
  password,
  confirmPass,
  addHandler,
}) => {
  return (
    <div className="container-login">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '445px',
          height: '742px',
          backgroundColor: 'rgb(189, 15, 15)',
          overflow: 'hidden',
        }}
      >
        <div className="login-container">
          <div className="login-title">Sign Up</div>
          <div className="field-input-container">
            <div className="field-input-login">
              <FaUser className="user" />
              <input type="text" placeholder="Userame" ref={username} />
            </div>
          </div>
          <div className="field-input-container">
            <div className="field-input-login">
              <IoIosPhonePortrait className="phone-number" />
              <input type="text" placeholder="Phone" ref={phoneNumber} />
            </div>
          </div>
          <div className="field-input-container">
            <div className="field-input-login">
              <MdAttachEmail className="phone-number" />
              <input type="text" placeholder="Email" ref={email} />
            </div>
          </div>
          <div className="field-input-container">
            <div className="field-input-login">
              <FaUnlock className="user" />
              <input type="password" placeholder="Password" ref={password} />
            </div>
          </div>
          <div className="field-input-container">
            <div className="field-input-login">
              <FaLock className="user" />
              <input
                type="password"
                placeholder="Confirm Password"
                ref={confirmPass}
              />
            </div>
          </div>
          <div className="field-input-container">
            <button onClick={() => addHandler()}>Sign Up</button>
          </div>
          <span
            style={{
              width: '100%',
              textAlign: 'center',
              color: 'rgb(184, 227, 119)',
            }}
          >
            Already have an acoount?
            <div
              style={{ color: 'white', cursor: 'pointer' }}
              onClick={() => changePage()}
            >
              Login now
            </div>
          </span>
        </div>
      </div>
      <div className="login-img-container">
        <img src={require('../../loginImg.png')} alt="" className="login-img" />
      </div>
    </div>
  );
};
export default Signup;
