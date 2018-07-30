import * as types from '../actions/types';

const initialState = {
  chat: null,
  errors: {},
  loading: true
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.OPEN_CHAT_START:
      return {
        ...state,
        errors: {},
        loading: true,
      };
    case types.OPEN_CHAT_SUCCESS:
      return {
        ...state,
        chat: action.chat,
        errors: {},
        loading: false,
      };
    case types.OPEN_CHAT_FAIL:
      return {
        ...state,
        errors: action.errors,
        loading: false,
      };
    default:
      return state;
  }
}
