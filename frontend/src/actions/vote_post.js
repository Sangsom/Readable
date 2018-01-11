import { UPVOTE_POST, DOWNVOTE_POST } from "./actions";
import { BASE_URL, TOKEN } from "../utils/constants";
import axios from "axios";

axios.defaults.headers.common["Authorization"] = TOKEN;

export function upVotePost(id) {
  return dispatch => {
    axios
      .post(`${BASE_URL}/posts/${id}`, {
        option: "upVote"
      })
      .then(response => {
        dispatch(upVotePostAsync(id));
      })
      .catch(err => console.log(err));
  };
}

function upVotePostAsync(id) {
  return {
    type: UPVOTE_POST,
    payload: id
  };
}

export function downVotePost(id) {
  return dispatch => {
    axios
      .post(`${BASE_URL}/posts/${id}`, {
        option: "downVote"
      })
      .then(response => {
        dispatch(downVotePostAsync(id));
      })
      .catch(err => console.log(err));
  };
}

function downVotePostAsync(id) {
  return {
    type: DOWNVOTE_POST,
    payload: id
  };
}
