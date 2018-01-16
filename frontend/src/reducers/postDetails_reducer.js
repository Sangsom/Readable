import { FETCH_POST_DETAILS } from "../actions/actions";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POST_DETAILS:
      if (Object.keys(action.payload).length > 0) {
        return action.payload;
      } else {
        return {
          deleted: true
        };
      }

    default:
      return state;
  }
}
