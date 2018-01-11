import {
  FETCH_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT
} from "../actions/actions";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return action.payload;
    case ADD_COMMENT:
      const {
        id,
        timestamp,
        body,
        author,
        parentId,
        voteScore
      } = action.payload;
      return [
        ...state,
        {
          id,
          timestamp,
          body,
          author,
          parentId,
          voteScore
        }
      ];
    case EDIT_COMMENT:
      return state.map(comment => {
        if (comment.id === action.payload.id) {
          comment.body = action.payload.body;
        }
        return comment;
      });
    case DELETE_COMMENT:
      return state.filter(comment => {
        return comment.id !== action.payload;
      });
    case UPVOTE_COMMENT:
      return state.map(comment => {
        if (comment.id === action.payload) {
          comment.voteScore += 1;
        }
        return comment;
      });
    case DOWNVOTE_COMMENT:
      return state.map(comment => {
        if (comment.id === action.payload) {
          comment.voteScore -= 1;
        }
        return comment;
      });
    default:
      return state;
  }
}
