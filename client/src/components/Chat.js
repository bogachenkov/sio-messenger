import React, { Component } from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client';

import Input from './Input';
import MessageList from './MessageList';
import ChatHeader from './ChatHeader';

import {addMessage, successOpenChat, successAuth} from '../store/actions';
import Spinner from './Spinner';

class Chat extends Component {

  componentWillMount() {
    this.socket = io('http://localhost/chat', {
      query: {
        user_id: this.props.user._id,
        room: this.props.chat_id
      }
    });
    this.socket.on('server:message', chat => this.props.updateChat(chat));
  }

  componentDidUpdate(prevProps, prevState) {
    const el = document.getElementById('msg_list');
    if (el) el.scrollTop = el.scrollHeight;
  }
  

  addMsgHandler = (msg) => {
    const interviewer = [...this.props.chat.members].filter(member => member.user._id !== this.props.user._id)[0];
    const data = {
      message: {
        text: msg,
        user_id: this.props.user._id
      },
      chat_id: this.props.chat._id,
      target_user_id: interviewer.user._id
    };
    this.props.addMessage(this.socket, data);
  }

  componentWillUnmount() {
    console.log('Chat unmounted');
    this.socket.disconnect();
  }
  

  render() {

    const {closeChat, chat, user, loading} = this.props;
    if (loading) return <Spinner />;
    const interviewer = [...chat.members].filter(member => member.user._id !== user._id)[0];

    return (
      <div className="Chat">
        <ChatHeader goBack={closeChat} user={interviewer.user} />
        <MessageList messages={chat.messages} user={user} />
        <Input addMsg={this.addMsgHandler} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chat: state.chat.chat,
  loading: state.chat.loading,
  errors: state.chat.errors,
  user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
  addMessage: (socket, data) => dispatch(addMessage(socket, data)),
  updateChat: (chat) => dispatch(successOpenChat(chat)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat);