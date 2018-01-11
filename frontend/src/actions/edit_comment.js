import { EDIT_COMMENT } from "./actions";
import { BASE_URL, TOKEN } from "../utils/constants";
import axios from "axios";

axios.defaults.headers.common["Authorization"] = TOKEN;

export default function editComment(data, callback) {
  const { id, timestamp, body } = data;
  return dispatch => {
    axios
      .put(`${BASE_URL}/comments/${id}`, {
        timestamp: timestamp,
        body: body
      })
      .then(response => {
        callback();
        dispatch(editCommentAsync(response.data));
      })
      .catch(err => console.log(err));
  };
}

function editCommentAsync(comment) {
  return {
    type: EDIT_COMMENT,
    payload: comment
  };
}
