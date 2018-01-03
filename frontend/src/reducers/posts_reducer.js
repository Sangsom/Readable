import { FETCH_POSTS, ADD_POST } from "../actions/actions";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_POSTS:
      return action.payload;
    case ADD_POST:
      const { id, timestamp, title, body, author, category } = action.payload;
      return [
        ...state,
        {
          id,
          timestamp,
          title,
          body,
          author,
          category
        }
      ];
    default:
      return state;
  }
}
