import React, { Component } from "react";
import { connect } from "react-redux";
import fetchComments from "../actions/fetch_comments";

class PostComments extends Component {
  componentDidMount() {
    this.props.fetchComments(this.props.id);
  }

  render() {
    console.log(this.props);
    const { comments } = this.props;
    return (
      <div>
        <b>Post comments:</b>
        {comments.map(comment => (
          <div key={comment.id}>
            <p>Author: {comment.author}</p>
            <p>Body: {comment.body}</p>
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comments
  };
}

export default connect(mapStateToProps, { fetchComments })(PostComments);
