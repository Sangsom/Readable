import { FETCH_POST_DETAILS } from "./actions";
import { BASE_URL, TOKEN } from "../utils/constants";
import axios from "axios";

axios.defaults.headers.common["Authorization"] = TOKEN;

export default function fetchPostDetails(id) {
  return dispatch => {
    axios
      .get(`${BASE_URL}/posts/${id}`)
      .then(response => {
        dispatch(fetchPostDetailsAsync(response.data));
      })
      .catch(err => console.log(err));
  };
}

function fetchPostDetailsAsync(post) {
  return {
    type: FETCH_POST_DETAILS,
    payload: post
  };
}
