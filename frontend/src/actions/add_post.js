import { ADD_POST } from "./actions";
import axios from "axios";

axios.defaults.headers.common["Authorization"] = "token";

export default function addPost(data) {
  const { id, timestamp, title, body, author, category } = data;
  return dispatch => {
    axios
      .post(`http://localhost:3001/posts`, {
        id: id,
        timestamp: timestamp,
        title: title,
        body: body,
        author: author,
        category: category
      })
      .then(response => {
        dispatch(addPostAsync(response.data));
      })
      .catch(err => console.log(err));
  };
}

function addPostAsync(post) {
  return {
    type: ADD_POST,
    payload: post
  };
}
