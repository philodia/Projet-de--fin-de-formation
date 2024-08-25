// src/reducers/index.js
import { combineReducers } from 'redux';
import userReducer from './userReducer'; // Assurez-vous que le chemin est correct
// Importez d'autres reducers si vous en avez

const rootReducer = combineReducers({
  user: userReducer,
  // Ajoutez d'autres reducers ici si nécessaire, par exemple:
  //auth: authReducer,
  // product: productReducer,
});

export default rootReducer;
