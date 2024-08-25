// src/actions/adminActions.js

import axios from 'axios';
import {
  FETCH_DASHBOARD_DATA_REQUEST,
  FETCH_DASHBOARD_DATA_SUCCESS,
  FETCH_DASHBOARD_DATA_FAILURE,
} from './actionTypes';

const API_URL = 'http://localhost:5000/auth/dashboard'; // Replace with your API endpoint

// Action creator to fetch dashboard data
export const fetchDashboardData = () => async (dispatch) => {
  dispatch({ type: FETCH_DASHBOARD_DATA_REQUEST });

  try {
    const response = await axios.get(API_URL);
    dispatch({ type: FETCH_DASHBOARD_DATA_SUCCESS, payload: response.data });
  } catch (error) {
    // Use error.response.data to get more detailed error message if available
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    dispatch({ type: FETCH_DASHBOARD_DATA_FAILURE, payload: errorMessage });
  }
};