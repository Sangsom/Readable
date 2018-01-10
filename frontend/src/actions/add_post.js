import { ADD_POST } from "./actions";
import { BASE_URL, TOKEN } from "../utils/constants";
import axios from "axios";

axios.defaults.headers.common["Authorization"] = TOKEN;

export default function addPost(data, callback) {
  const { id, timestamp, title, body, author, category } = data;
  return dispatch => {
    axios
      .post(`${BASE_URL}/posts`, {
        id: id,
        timestamp: timestamp,
        title: title,
        body: body,
        author: author,
        category: category
      })
      .then(response => {
        callback();
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
