import { UPVOTE_COMMENT, DOWNVOTE_COMMENT } from "./actions";
import { BASE_URL, TOKEN } from "../utils/constants";
import axios from "axios";

axios.defaults.headers.common["Authorization"] = TOKEN;

export function upVoteComment(id) {
  return dispatch => {
    axios
      .post(`${BASE_URL}/comments/${id}`, {
        option: "upVote"
      })
      .then(response => {
        dispatch(upVoteCommentAsync(id));
      })
      .catch(err => console.log(err));
  };
}

function upVoteCommentAsync(id) {
  return {
    type: UPVOTE_COMMENT,
    payload: id
  };
}

export function downVoteComment(id) {
  return dispatch => {
    axios
      .post(`${BASE_URL}/comments/${id}`, {
        option: "downVote"
      })
      .then(response => {
        dispatch(downVoteCommentAsync(id));
      })
      .catch(err => console.log(err));
  };
}

function downVoteCommentAsync(id) {
  return {
    type: DOWNVOTE_COMMENT,
    payload: id
  };
}
