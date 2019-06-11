import { combineReducers } from 'redux';
import musicReducer from './musicReducer';

export default combineReducers({
  music: musicReducer
});