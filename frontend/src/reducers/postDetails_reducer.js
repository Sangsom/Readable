import { FETCH_POST_DETAILS } from "../actions/actions";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POST_DETAILS:
      return action.payload;
    default:
      return state;
  }
}
