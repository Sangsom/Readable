import React, { Component } from "react";
import { connect } from "react-redux";
import fetchComments from "../actions/fetch_comments";
import { Feed, Header } from "semantic-ui-react";

class PostComments extends Component {
  componentDidMount() {
    this.props.fetchComments(this.props.id);
  }

  render() {
    console.log(this.props);
    const { comments } = this.props;
    const commentImage = "../assets/images/elliot.jpg";
    return (
      <div>
        <Feed>
          <Header size="large">Comments</Header>
          {comments.map(comment => (
            <Feed.Event
              key={comment.id}
              image={commentImage}
              date={`${new Date(
                comment.timestamp
              ).toDateString()} at ${new Date(
                comment.timestamp
              ).toLocaleTimeString()}`}
              summary={`${comment.author} commented...`}
              extraText={comment.body}
            />
          ))}
        </Feed>
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
