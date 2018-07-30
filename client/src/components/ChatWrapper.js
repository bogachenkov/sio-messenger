import React, { Component } from 'react';
import {connect} from 'react-redux';

import {openChat} from '../store/actions';

import Chat from './Chat';
import ChatList from './ChatList';

class ChatWrapper extends Component {

  state = {
    chatIsOpen: false,
    chat_id: null
  }

  openChatHandler = (chat_id) => {
    this.setState({
      chatIsOpen: true,
      chat_id
    }, () => this.props.openChat(chat_id));
  }

  closeChatHandler = () => {
    this.setState({chatIsOpen: false, chat_id: null})
  }

  render() {

    return (
      this.state.chatIsOpen ?
      <Chat closeChat={this.closeChatHandler} chat_id={this.state.chat_id} /> :
      <ChatList openChat={this.openChatHandler}/>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.chats.loading,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  openChat: (chat_id) => dispatch(openChat(chat_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatWrapper);