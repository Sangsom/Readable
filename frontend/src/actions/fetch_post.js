import { FETCH_POST } from "./actions";
import axios from "axios";

export default function fetchPost(category) {
  return dispatch => {
    axios
      .get(`http://localhost:3001/${category}/posts`, {
        headers: {
          Authorization: "token"
        }
      })
      .then(response => {
        dispatch(fetchPostAsync(response.data));
      })
      .catch(err => console.log(err));
  };
}

function fetchPostAsync(post) {
  return {
    type: FETCH_POST,
    payload: post
  };
}
