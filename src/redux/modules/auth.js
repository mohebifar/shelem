import { REHYDRATE } from 'redux-persist/constants';

// Actions
export const LOGIN = 'auth/LOGIN';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'auth/LOGIN_FAIL';
export const LOGOUT = 'auth/LOGOUT';

const initialState = {
  loading: false,
  loaded: false,
  user: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        loading: false,
        loaded: true,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        user: action,
        loading: false,
        loaded: false,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        loading: false,
        loaded: false,
      };
    default:
      return state;
  }
}

export function login({email, password}) {
  return {
    type: LOGIN,
    email,
    password
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}
