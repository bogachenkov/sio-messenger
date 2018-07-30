import React from 'react';
import { Emoji } from 'emoji-mart';

const getEmojiFromColons = (str) => {
  let regex = new RegExp('(\:[a-zA-Z0-9-_+]+\:)', 'g');
  let splittedStr = str.split(regex);
  let result = splittedStr.map(( el ) => {
    //return el.replace(regex, match => <Emoji emoji={match} size={18} html={true} set='twitter' />)
    if (regex.test(el)) return (
      <span dangerouslySetInnerHTML={{
        __html: Emoji({
          html: true,
          set: 'twitter',
          emoji: el,
          size: 20
        })
      }}></span>
    )
    return el;
  });
  return result;
}

const Message = ({ isUser, children }) => {
  return (
    <p className={`Message__wrapper ${isUser ? 'user' : ''}`}>
      <span className={`Message ${isUser ? 'user' : ''}`}>
        {getEmojiFromColons(children).map((part, i) => <span key={`${i}_${Date.now()}`}>{part}</span>)}
      </span>
    </p>
  );
};

export default Message;