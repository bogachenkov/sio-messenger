import React from 'react';
import {connect} from 'react-redux';
import m from 'moment';
import io from 'socket.io-client';
import { Emoji } from 'emoji-mart';

import {loadChats, loadingChatsSuccess} from '../store/actions';
import Spinner from './Spinner';

class ChatList extends React.Component {
  
  componentWillMount() {
    console.log('Chatlist loading');
    this.props.loadChats(this.props.user._id);
    this.socket = io('http://192.168.31.170:5000/chatlist', {
      query: {
        user_id: this.props.user._id
      }
    });
    this.socket.on('server:message', chats => this.props.updateChatList(chats));
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  getEmojiFromColons = (str) => {
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
            size: 16
          })
        }}></span>
      )
      return el;
    });
    return result;
  }

  unreadedMsgCounter = (chat, user_id) => {
    const userDate = chat.members.filter(member => member.user._id == user_id)[0].last_seen;
    return chat.messages.reduce((total, message) => {
      if (message.user_id !== user_id && message.time > userDate) return total + 1;
      else return total;
    }, 0)
  }

  render () {
    const {openChat, chats, user, loading} = this.props;

    let content = <Spinner />;
    if (!loading) content = (
      <ul className="ChatList__items">
          {chats.map(chat => {
            const interviewer = [...chat.members].filter(member => member.user._id !== user._id)[0];
            const unreaded = this.unreadedMsgCounter(chat, user._id);
            return (
              <li key={chat._id} onClick={() => openChat(chat._id)}>
                <span className="ChatList__avatar">{interviewer.user.username[0]}</span>
                <div className="ChatList__data">
                  <p className="ChatList__username">
                    <strong>{interviewer.user.username}</strong>
                  </p>
                  <p className="ChatList__last-message">
                    {this.getEmojiFromColons(chat.messages[chat.messages.length - 1].text).map((part, i) => <span key={i+part+Date.now()}>{part}</span>)}
                  </p>
                </div>
                <div className="ChatList__info">
                  <p className="ChatList__date">{m(chat._updated).format('DD.MM.YYYY HH:mm')}</p>
                  {
                    unreaded ? <span className="ChatList__badge">{unreaded}</span> : null
                  }
                </div>
              </li>
              )
          })}
        </ul>
    )
    return (
      <article className="ChatList">
        <header className="ChatList__header">
          Все чаты
        </header>
        {content}
      </article>
    );
  }
};

const mapStateToProps = state => ({
  user: state.auth.user,
  chats: state.chats.chats,
  loading: state.chats.loading
});

const mapDispatchToProps = dispatch => ({
  loadChats: (user_id) => dispatch(loadChats(user_id)),
  updateChatList: (chats) => dispatch(loadingChatsSuccess(chats))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);