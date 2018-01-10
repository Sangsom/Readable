import { FETCH_COMMENTS } from "./actions";
import { BASE_URL, TOKEN } from "../utils/constants";
import axios from "axios";

axios.defaults.headers.common["Authorization"] = TOKEN;

export default function fetchComments(id) {
  return dispatch => {
    axios
      .get(`${BASE_URL}/posts/${id}/comments`)
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
