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
        dispatch(deletePostAsync(id));
      })
      .catch(err => console.log(err));
  };
}

function deletePostAsync(id) {
  return {
    type: DELETE_POST,
    payload: id
  };
}