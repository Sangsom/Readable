import { EDIT_POST } from "./actions";
import axios from "axios";

axios.defaults.headers.common["Authorization"] = "token";

export default function editPost(data) {
  const { id, title, body } = data;
  return dispatch => {
    axios
      .put(`http://localhost:3001/posts/${id}`, {
        title: title,
        body: body
      })
      .then(response => {
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
