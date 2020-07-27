import { FETCH_TAGS } from "../actionTypes";
export default function tagReducer(state = [], action) {
  switch (action.types) {
    case FETCH_TAGS:
      console.log("Payload: ", action);
      return Object.assign({}, state, { tags: action.payload });
    default:
      return state;
  }
}
