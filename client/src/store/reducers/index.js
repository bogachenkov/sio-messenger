import { combineReducers } from 'redux';

import authReducer from './auth';
import chatsReducer from './chats';
import chatReducer from './chat';


export default combineReducers({
  auth: authReducer,
  chats: chatsReducer,
  chat: chatReducer
});
