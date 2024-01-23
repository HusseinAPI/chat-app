import React from 'react';
import { FaUser } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';

const Login = ({ changePage, email, password, verifyHandler }) => {
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
          <div className="login-title">Login</div>
          <div className="field-input-container">
            <div className="field-input-login">
              <FaUser className="user" />
              <input type="text" placeholder="Email" ref={email} />
            </div>
          </div>
          <div className="field-input-container">
            <div className="field-input-login">
              <FaLock className="user" />
              <input type="password" placeholder="Password" ref={password} />
            </div>
          </div>
          <div className="field-input-container">
            <button onClick={() => verifyHandler()}>Login</button>
          </div>
          <span
            style={{
              width: '100%',
              textAlign: 'center',
              color: 'rgb(184, 227, 119)',
            }}
          >
            Don't have an account?
            <div
              style={{ color: 'white', cursor: 'pointer' }}
              onClick={() => changePage()}
            >
              Sign up
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

export default Login;
