import {
  FETCH_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  UPVOTE_POST,
  DOWNVOTE_POST
} from "../actions/actions";

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
    case EDIT_POST:
      return state.map(post => {
        return post.id === action.payload.id ? action.payload : post;
      });
    case DELETE_POST:
      return state.filter(post => {
        return post.id !== action.payload.id;
      });
    case UPVOTE_POST:
      return state.map(post => {
        if (post.id === action.payload) {
          post.voteScore += 1;
        }
        return post;
      });
    case DOWNVOTE_POST:
      return state.map(post => {
        if (post.id === action.payload) {
          post.voteScore -= 1;
        }
        return post;
      });
    default:
      return state;
  }
}
