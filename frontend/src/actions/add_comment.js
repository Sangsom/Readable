import { ADD_COMMENT } from "./actions";
import { BASE_URL, TOKEN } from "../utils/constants";
import axios from "axios";

axios.defaults.headers.common["Authorization"] = TOKEN;

export default function addComment(data, callback) {
  const { id, timestamp, body, author, parentId } = data;
  return dispatch => {
    axios
      .post(`${BASE_URL}/comments`, {
        id: id,
        timestamp: timestamp,
        body: body,
        author: author,
        parentId: parentId,
        voteScore: 1
      })
      .then(response => {
        callback();
        dispatch(addCommentAsync(response.data));
      })
      .catch(err => console.log(err));
  };
}

function addCommentAsync(comment) {
  return {
    type: ADD_COMMENT,
    payload: comment
  };
}
