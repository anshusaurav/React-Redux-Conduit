import { FETCH_USER, UPDATE_USER } from "../actionTypes";
export default function userReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_USER:
      return Object.assign({}, state, action.payload);
    case UPDATE_USER:
      return Object.assign({}, state, { isUpdated: !state.isUpdated });
    default:
      return state;
  }
}
