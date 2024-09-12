// src/actions/userActions.js

import axios from 'axios';
import { 
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS, 
  GET_USERS_FAILURE,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS, 
  CREATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE
} from './actionTypes'; // Assurez-vous que le chemin est correct

// Créer un nouvel utilisateur
export const createUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_USER_REQUEST });
    const response = await axios.post('http://localhost:5000/api/auth/register', userData);
    dispatch({ type: CREATE_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: CREATE_USER_FAILURE,
      payload: error.response ? error.response.data.message : 'Une erreur s\'est produite'
    });
  }
};

// Obtenir tous les utilisateurs
export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USERS_REQUEST });
    const response = await axios.get('http://localhost:5000/api/auth/users');
    dispatch({ type: GET_USERS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: GET_USERS_FAILURE,
      payload: error.response ? error.response.data.message : 'Une erreur s\'est produite'
    });
  }
};

// Mettre à jour un utilisateur
export const updateUser = (userId, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });
    const response = await axios.put(`http://localhost:5000/api/auth/users/${userId}`, userData);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAILURE,
      payload: error.response ? error.response.data.message : 'Une erreur s\'est produite'
    });
  }
};

// Supprimer un utilisateur
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    await axios.delete(`http://localhost:5000/api/auth/users/${id}`);
    dispatch({ type: DELETE_USER_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAILURE,
      payload: error.response ? error.response.data.message : 'Une erreur s\'est produite'
    });
  }
};
