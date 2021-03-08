import userLoggedReducer from './userLoggedReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  isLogged: userLoggedReducer
});

export default allReducers;