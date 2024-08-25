import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  CHECK_STATUS_REQUEST,
  CHECK_STATUS_SUCCESS,
  CHECK_STATUS_FAILURE
} from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: null,
  users: [],
  loading: false,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
    case FETCH_USERS_REQUEST:
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
    case CHECK_STATUS_REQUEST:
      return { ...state, loading: true, error: null };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, user: action.payload, loading: false };

    case LOGOUT_SUCCESS:
      return { ...state, isAuthenticated: false, user: null, loading: false };

    case FETCH_USERS_SUCCESS:
      return { ...state, users: action.payload, loading: false };

    case UPDATE_USER_SUCCESS:
    case DELETE_USER_SUCCESS:
      return { ...state, loading: false };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case LOGOUT_FAILURE:
    case FETCH_USERS_FAILURE:
    case UPDATE_USER_FAILURE:
    case DELETE_USER_FAILURE:
    case CHECK_STATUS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CHECK_STATUS_SUCCESS:
      return { ...state, isAuthenticated: true, loading: false };

    default:
      return state;
  }
};

export default authReducer;
