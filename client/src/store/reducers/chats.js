import * as types from '../actions/types';

const initialState = {
  chats: [],
  errors: {},
  loading: true
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_CHATS_START:
      return {
        ...state,
        chats: [],
        errors: {},
        loading: true,
      };
    case types.LOAD_CHATS_SUCCESS:
      return {
        ...state,
        chats: action.chats,
        errors: {},
        loading: false,
      };
    case types.LOAD_CHATS_FAIL:
      return {
        ...state,
        errors: action.errors,
        loading: false,
        chats: []
      };
    default:
      return state;
  }
}
