import { FETCH_COMMENTS, ADD_COMMENT } from "../actions/actions";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return action.payload;
    case ADD_COMMENT:
      const { id, timestamp, body, author, parentId } = action.payload;
      return [
        ...state,
        {
          id,
          timestamp,
          body,
          author,
          parentId
        }
      ];
    default:
      return state;
  }
}
