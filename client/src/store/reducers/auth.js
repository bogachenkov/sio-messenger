import * as types from '../actions/types';

const initialState = {
  user: null,
  isAuth: false,
  errors: {},
  loading: false
}

const isEmpty = val =>
  val === undefined ||
  val === null ||
  (typeof val === 'object' && Object.keys(val).length === 0) ||
  (typeof val === 'string' && val.trim().length === 0)

export default function(state = initialState, action) {
  switch (action.type) {
    case types.AUTH_START:
      return {
        ...state,
        isAuth: false,
        errors: {},
        loading: true,
        user: null
      };
    case types.AUTH_SUCCESS:
      return {
        ...state,
        errors: {},
        isAuth: !isEmpty(action.user),
        loading: false,
        user: action.user
      };
    case types.AUTH_FAIL:
      return {
        ...state,
        errors: action.errors,
        loading: false,
        user: null
      };
    case types.AUTH_LOGOUT:
      return {
        ...state,
        isAuth: false,
        loading: false,
        user: null
      };
    default:
      return state;
  }
}
