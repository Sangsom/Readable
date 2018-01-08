import React, { Component } from "react";
import { connect } from "react-redux";
import fetchPostDetails from "../actions/fetch_post_details";
import PostComments from "./PostComments";

class PostDetails extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchPostDetails(id);
  }

  render() {
    const { postDetails } = this.props;
    const id = this.props.match.params.id;

    return (
      <div>
        These are selected post details:
        <p>Title: {postDetails.title}</p>
        <p>Body: {postDetails.body}</p>
        <p>Author: {postDetails.author}</p>
        <p>Date: {Date(postDetails.timestamp)}</p>
        <p>Votescore: {postDetails.voteScore}</p>
        {postDetails.commentCount > 0 ? (
          <PostComments id={id} />
        ) : (
          <p>No comments for this post</p>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    postDetails: state.postDetails
  };
}

export default connect(mapStateToProps, { fetchPostDetails })(PostDetails);
