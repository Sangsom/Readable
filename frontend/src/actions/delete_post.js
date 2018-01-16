import { DELETE_POST } from "./actions";
import { BASE_URL, TOKEN } from "../utils/constants";
import axios from "axios";

axios.defaults.headers.common["Authorization"] = TOKEN;

export default function deletePost(id, callback) {
  return dispatch => {
    axios
      .delete(`${BASE_URL}/posts/${id}`)
      .then(response => {
        callback();
        dispatch(deletePostAsync(response.data));
      })
      .catch(err => console.log(err));
  };
}

function deletePostAsync(post) {
  return {
    type: DELETE_POST,
    payload: post
  };
}
