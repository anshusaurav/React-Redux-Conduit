import { FETCH_USER, UPDATE_USER } from "../actionTypes";
const initialState = {
  isUpdated: false,
  isTagClicked: false,
  tagSelected: null,
  user: null,
};
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return Object.assign({}, state, action.payload);
    case UPDATE_USER:
      return Object.assign({}, state, { isUpdated: !state.isUpdated });
    default:
      return state;
  }
}
