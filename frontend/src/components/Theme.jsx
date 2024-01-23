import React from 'react';
import {
  openChangedList,
  selectTheme,
  changeTheme,
} from '../store/ContactsSlice';
import { useDispatch, useSelector } from 'react-redux';

const Theme = () => {
  const selectChoice = useSelector((state) => state.ContactsSlice.selectChoice);

  const dispatch = useDispatch();
  return (
    <div className="theme-container">
      <div style={{ fontSize: '20px' }}>Choose theme</div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <label>Light</label>
        <div
          className="radio"
          onClick={() => dispatch(selectTheme({ light: true, dark: false }))}
        >
          <div
            style={
              selectChoice.light
                ? {
                    backgroundColor: 'rgb(81, 151, 38)',
                    borderRadius: '50%',
                    width: '13px',
                    height: '13px',
                  }
                : null
            }
          ></div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <label>Dark</label>
        <div
          className="radio"
          onClick={() => dispatch(selectTheme({ light: false, dark: true }))}
        >
          <div
            style={
              selectChoice.dark
                ? {
                    backgroundColor: 'rgb(81, 151, 38)',
                    borderRadius: '50%',
                    width: '13px',
                    height: '13px',
                  }
                : null
            }
          ></div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div>
          <button
            className="cancel-button"
            onClick={() => dispatch(openChangedList(false))}
          >
            cancel
          </button>
          <button
            className="ok-button"
            onClick={() => {
              if (selectChoice.light) {
                dispatch(changeTheme(false));
              } else {
                dispatch(changeTheme(true));
              }
              dispatch(openChangedList(false));
            }}
          >
            ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default Theme;
