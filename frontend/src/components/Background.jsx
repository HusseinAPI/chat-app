import React from 'react';

const Background = () => {
  return (
    <div>
      <img
        src={require('../icons.png')}
        alt=""
        style={{ height: '550px', width: '550px' }}
      />
      <p>Chat App</p>
      <p>Send and Receive messages online</p>
    </div>
  );
};

export default Background;
