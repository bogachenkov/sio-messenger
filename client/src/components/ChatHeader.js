import React from 'react';

const ChatHeader = ({goBack, user}) => {
  return (
    <header className="ChatHeader">
      <button onClick={goBack} className="ChatHeader__back">Назад</button>
      <div className="ChatHeader__user">
        <span className="ChatHeader__avatar">{user.username[0]}</span>
        <p className="ChatHeader__username">{user.username}</p>
      </div>
    </header>
  );
}
export default ChatHeader;