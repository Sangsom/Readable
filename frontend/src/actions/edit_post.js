import { EDIT_POST } from "./actions";
import { BASE_URL, TOKEN } from "../utils/constants";
import axios from "axios";

axios.defaults.headers.common["Authorization"] = TOKEN;

export default function editPost(data, callback) {
  const { id, title, body } = data;
  return dispatch => {
    axios
      .put(`${BASE_URL}/posts/${id}`, {
        title: title,
        body: body
      })
      .then(response => {
        callback();
        dispatch(editPostAsync(response.data));
      })
      .catch(err => console.log(err));
  };
}

function editPostAsync(post) {
  return {
    type: EDIT_POST,
    payload: post
  };
}
