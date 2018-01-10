import { FETCH_POSTS } from "./actions";
import { BASE_URL, TOKEN } from "../utils/constants";
import axios from "axios";

axios.defaults.headers.common["Authorization"] = TOKEN;

export default function fetchPosts() {
  return dispatch => {
    axios
      .get(`${BASE_URL}/posts`)
      .then(response => {
        dispatch(fetchPostsAsync(response.data));
      })
      .catch(err => console.log(err));
  };
}

function fetchPostsAsync(posts) {
  return {
    type: FETCH_POSTS,
    payload: posts
  };
}
