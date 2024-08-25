// src/reducers/gescomReducer.js
import {
    FETCH_DASHBOARD_DATA_REQUEST,
    FETCH_DASHBOARD_DATA_SUCCESS,
    FETCH_DASHBOARD_DATA_FAILURE,
  } from '../actions/gescomActions';
  
  const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  const gescomReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DASHBOARD_DATA_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_DASHBOARD_DATA_SUCCESS:
        return { ...state, loading: false, data: action.payload };
      case FETCH_DASHBOARD_DATA_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default gescomReducer;
  