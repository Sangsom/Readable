import {
  FETCH_POSTS,
  ORDER_BY_VOTESCORE,
  ORDER_BY_TIMESTAMP
} from "../actions/actions";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_POSTS:
      console.log(action.payload);
      return action.payload;
    case ORDER_BY_VOTESCORE:
      return action.payload.sort((a, b) => {
        return a.voteScore > b.voteScore;
      });
    case ORDER_BY_TIMESTAMP:
      return action.payload.sort((a, b) => {
        return a.timestamp > b.timestamp;
      });
    default:
      return state;
  }
}
