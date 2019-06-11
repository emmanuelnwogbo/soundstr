import { FETCH_SONG } from '../actions';

//in the api database, our list of users is contained
//within an array, so we'll default the initial state
//to an array
export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SONG:
      return action.payload.data;
    default:
      return state;
  }
}
