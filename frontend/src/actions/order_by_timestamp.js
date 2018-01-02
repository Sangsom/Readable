import { ORDER_BY_TIMESTAMP } from "./actions";
import axios from "axios";

export default function fetchByVotescore() {
  return dispatch => {
    axios
      .get(`http://localhost:3001/posts`, {
        headers: {
          Authorization: "token"
        }
      })
      .then(response => {
        dispatch(fetchPostsAsync(response.data));
      })
      .catch(err => console.log(err));
  };
}

function fetchPostsAsync(posts) {
  return {
    type: ORDER_BY_TIMESTAMP,
    payload: posts
  };
}
