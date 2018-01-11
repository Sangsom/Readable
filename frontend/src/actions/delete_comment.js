import { DELETE_COMMENT } from "./actions";
import { BASE_URL, TOKEN } from "../utils/constants";
import axios from "axios";

axios.defaults.headers.common["Authorization"] = TOKEN;

export default function deleteComment(id, callback) {
  return dispatch => {
    axios
      .delete(`${BASE_URL}/comments/${id}`)
      .then(response => {
        callback();
        dispatch(deleteCommentAsync(id));
      })
      .catch(err => console.log(err));
  };
}
function deleteCommentAsync(id) {
  return {
    type: DELETE_COMMENT,
    payload: id
  };
}
