import { FETCH_USER } from "../actionTypes";
export default function userReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_USER:
      return Object.assign({}, state, { user: action.payload });
    default:
      return state;
  }
}
