import React from 'react';
import Message from './Message';

const MessageList = ({messages, user}) => {
  return (
    <div className="MessageList" id="msg_list">
      {
        messages.map(msg => (
          <Message key={msg._id} isUser={msg.user_id === user._id}>{msg.text}</Message>
        ))
      }
    </div>
  );
};

export default MessageList;