import React, { useRef, useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import { useDispatch, useSelector } from 'react-redux';
import { logChange, verification, addUser } from '../../store/AuthSlice';

const Log = () => {
  const hasAccount = useSelector((state) => state.AuthSlice.hasAccount);
  const registered = useSelector((state) => state.AuthSlice.registered);

  const [failed, setFailed] = useState(false);

  const dispatch = useDispatch();

  const email = useRef(null);
  const phone = useRef(null);
  const password = useRef(null);
  const confirmPass = useRef(null);
  const username = useRef(null);

  const changePage = () => {
    dispatch(logChange());
  };

  // verify user in log In

  const verifyHandler = () => {
    const data = {
      email: email.current.value,
      password: password.current.value,
    };
    if (data.email.length !== 0 && data.password.length !== 0) {
      dispatch(verification(data));
      if (registered === false) {
        setFailed(true);
      }
    }
  };

  // add new User

  const addHandler = () => {
    const data = {
      username: username.current.value,
      phone: phone.current.value,
      email: email.current.value,
      password: password.current.value,
      contacts: [],
    };
    if (
      data.username.length !== 0 &&
      data.phone.length !== 0 &&
      data.email.length !== 0 &&
      data.password.length !== 0 &&
      data.password === confirmPass.current.value
    ) {
      dispatch(addUser(data));
      if (registered === false) {
        setFailed(true);
      }
    }
  };

  return (
    <div>
      {hasAccount ? (
        <>
          <Login
            changePage={changePage}
            email={email}
            password={password}
            verifyHandler={verifyHandler}
          />
          {failed ? (
            <>
              <div className="failed-container">
                <div style={{ textAlign: 'center' }}>
                  The Email or Password not valid
                  <br />
                  please check connection and try again.
                </div>
                <div style={{ textAlign: 'center' }}>
                  <button onClick={() => setFailed(false)}>OK</button>
                </div>
              </div>
              <div
                className="failed-block"
                onClick={() => setFailed(false)}
              ></div>
            </>
          ) : null}
        </>
      ) : (
        <>
          <Signup
            changePage={changePage}
            username={username}
            phoneNumber={phone}
            email={email}
            password={password}
            confirmPass={confirmPass}
            addHandler={addHandler}
          />
          {failed ? (
            <>
              <div className="failed-container">
                <div style={{ textAlign: 'center' }}>
                  please change email address and try again.
                </div>
                <div style={{ textAlign: 'center' }}>
                  <button onClick={() => setFailed(false)}>OK</button>
                </div>
              </div>
              <div
                className="failed-block"
                onClick={() => setFailed(false)}
              ></div>
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Log;
