import { FETCH_POST_DETAILS } from "./actions";
import axios from "axios";

export default function fetchPostDetails(id) {
  return dispatch => {
    axios
      .get(`http://localhost:3001/posts/${id}`, {
        headers: {
          Authorization: "token"
        }
      })
      .then(response => {
        dispatch(fetchPostDetailsAsync(response.data));
      })
      .catch(err => console.log(err));
  };
}

function fetchPostDetailsAsync(post) {
  return {
    type: FETCH_POST_DETAILS,
    payload: post
  };
}
