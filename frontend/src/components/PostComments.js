import React, { Component } from "react";
import { connect } from "react-redux";
import fetchComments from "../actions/fetch_comments";
import { Feed, Header, Icon } from "semantic-ui-react";

class PostComments extends Component {
  componentDidMount() {
    this.props.fetchComments(this.props.id);
  }

  render() {
    const { comments } = this.props;
    const commentImage = "../assets/images/elliot.jpg";
    return (
      <div>
        <Feed>
          <Header size="large">Comments</Header>
          {comments.map(comment => (
            <Feed.Event key={comment.id}>
              <Feed.Label image={commentImage} />
              <Feed.Content>
                <Feed.Date>
                  {`${new Date(comment.timestamp).toDateString()} at ${new Date(
                    comment.timestamp
                  ).toLocaleTimeString()}`}
                </Feed.Date>
                <Feed.Summary>
                  <Feed.User>{`${comment.author}`}</Feed.User> commented...
                </Feed.Summary>
                <Feed.Extra text>{comment.body}</Feed.Extra>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon
                      name="like"
                      color={comment.voteScore > 0 ? "green" : "red"}
                    >
                      {" "}
                    </Icon>
                    {comment.voteScore} Likes
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
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
