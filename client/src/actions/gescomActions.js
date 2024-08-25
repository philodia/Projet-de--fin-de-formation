// src/actions/gescomActions.js
import axios from 'axios';

export const FETCH_DASHBOARD_DATA_REQUEST = 'FETCH_DASHBOARD_DATA_REQUEST';
export const FETCH_DASHBOARD_DATA_SUCCESS = 'FETCH_DASHBOARD_DATA_SUCCESS';
export const FETCH_DASHBOARD_DATA_FAILURE = 'FETCH_DASHBOARD_DATA_FAILURE';

export const fetchDashboardData = () => async (dispatch) => {
  dispatch({ type: FETCH_DASHBOARD_DATA_REQUEST });
  try {
    const response = await axios.get('/api/gescom/dashboard'); // Remplacez par votre URL d'API
    dispatch({
      type: FETCH_DASHBOARD_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_DASHBOARD_DATA_FAILURE,
      payload: error.message,
    });
  }
};
