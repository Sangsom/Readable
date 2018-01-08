import { FETCH_COMMENTS } from "./actions";
import axios from "axios";

export default function fetchComments(id) {
  return dispatch => {
    axios
      .get(`http://localhost:3001/posts/${id}/comments`, {
        headers: {
          Authorization: "token"
        }
      })
      .then(response => {
        dispatch(fetchCommentsAsync(response.data));
      })
      .catch(err => console.log(err));
  };
}

function fetchCommentsAsync(comments) {
  return {
    type: FETCH_COMMENTS,
    payload: comments
  };
}
