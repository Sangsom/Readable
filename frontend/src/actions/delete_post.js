import { DELETE_POST } from "./actions";
import axios from "axios";

axios.defaults.headers.common["Authorization"] = "token";

export default function deletePost(id, callback) {
  return dispatch => {
    axios
      .delete(`http://localhost:3001/posts/${id}`)
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
