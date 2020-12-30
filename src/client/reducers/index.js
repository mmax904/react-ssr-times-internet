import { combineReducers } from 'redux';
import authReducer from './authReducer';
import drawingsReducer from './drawingsReducer';

export default combineReducers({
  auth: authReducer,
  drawings: drawingsReducer
});
