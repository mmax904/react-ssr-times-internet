import { FETCH_DRAWINGS } from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_DRAWINGS:
      return action.payload.data;
    default:
      return state;
  }
};
