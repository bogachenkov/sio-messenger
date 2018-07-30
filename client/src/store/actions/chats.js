import axios from 'axios';
import {
  LOAD_CHATS_START,
  LOAD_CHATS_SUCCESS,
  LOAD_CHATS_FAIL,
  OPEN_CHAT_START,
  OPEN_CHAT_SUCCESS,
  OPEN_CHAT_FAIL
} from './types';

const startLoadingChats = () => ({
  type: LOAD_CHATS_START
});

export const loadingChatsSuccess = (chats) => ({
  type: LOAD_CHATS_SUCCESS,
  chats
});

const loadingChatsFailed = (errors) => ({
  type: LOAD_CHATS_FAIL,
  errors
});

const startOpenChat = () => ({
  type: OPEN_CHAT_START
});

export const successOpenChat = (chat) => ({
  type: OPEN_CHAT_SUCCESS,
  chat
});

const failOpenChat = (errors) => ({
  type: OPEN_CHAT_FAIL,
  errors
});


export const loadChats = user_id => dispatch => {
  dispatch(startLoadingChats());
  axios.get(`/api/chats/all/${user_id}`)
    .then(res => dispatch(loadingChatsSuccess(res.data)))
    .catch(err => dispatch(loadingChatsFailed(err.response.data)))
}

export const openChat = chat_id => dispatch => {
  dispatch(startOpenChat());
  axios.get(`/api/chats/${chat_id}`)
    .then(res => dispatch(successOpenChat(res.data)))
    .catch(err => dispatch(failOpenChat(err.response.data)))
}

export const addMessage = (socket, data) => dispatch => {
  socket.emit('client:message', data)
}

export const updateChatList = (user_id) => dispatch => {
  axios.get(`/api/chats/all/${user_id}`)
  .then(res => dispatch(loadingChatsSuccess(res.data)))
  .catch(err => dispatch(loadingChatsFailed(err.response.data)))
}