import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import fetchComments from "../actions/fetch_comments";
import deleteComment from "../actions/delete_comment";
import editComment from "../actions/edit_comment";
import CommentActions from "./CommentActions";
import { upVoteComment, downVoteComment } from "../actions/vote_comment";
import { Feed, Header, Icon, Modal, Button, Form } from "semantic-ui-react";

class PostComments extends Component {
  state = {
    modalOpen: false,
    id: "",
    body: ""
  };

  componentDidMount() {
    this.props.fetchComments(this.props.id);
  }

  deleteComment = id => {
    this.props.deleteComment(id, () => {});
  };

  handleOpen = (id, body) => {
    this.setState({ modalOpen: true, id, body });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = e => {
    e.preventDefault();
    const { id, body } = this.state;
    const updated_comment = {
      id,
      timestamp: Date.now(),
      body
    };

    this.props.editComment(updated_comment, () => {
      this.setState({
        modalOpen: false
      });
    });
  };

  render() {
    const { body, modalOpen } = this.state;
    const { comments } = this.props;
    const commentImage = "../assets/images/elliot.jpg";
    return (
      <div>
        <Feed>
          <Header size="large">Comments</Header>
          {comments.map(({ id, body, timestamp, author, voteScore }) => (
            <Feed.Event key={id}>
              <Feed.Label image={commentImage} />
              <Feed.Content>
                <Feed.Date>
                  {`${new Date(timestamp).toDateString()} at ${new Date(
                    timestamp
                  ).toLocaleTimeString()}`}
                </Feed.Date>
                <Feed.Summary>
                  <Feed.User>{`${author}`}</Feed.User> commented...
                </Feed.Summary>
                <Feed.Extra text>{body}</Feed.Extra>
                <Feed.Extra>
                  <CommentActions
                    id={id}
                    handleOpen={this.handleOpen}
                    deleteComment={this.deleteComment}
                    body={body}
                  />
                </Feed.Extra>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name="like" color={voteScore > 0 ? "green" : "red"}>
                      {" "}
                    </Icon>
                    {voteScore} Likes
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
          ))}
        </Feed>

        <Modal
          closeIcon
          closeOnEscape={false}
          closeOnRootNodeClick={false}
          size="mini"
          open={modalOpen}
          onClose={this.handleClose}
        >
          <Header size="large" content="Edit comment" />
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.TextArea
                label=""
                placeholder="Edit your comment"
                name="body"
                value={body}
                onChange={this.handleChange}
              />
              <Button positive type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comments
  };
}

PostComments.propTypes = {
  comments: PropTypes.array.isRequired,
  deleteComment: PropTypes.func.isRequired,
  downVoteComment: PropTypes.func.isRequired,
  upVoteComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  fetchComments: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default connect(mapStateToProps, {
  fetchComments,
  editComment,
  deleteComment,
  upVoteComment,
  downVoteComment
})(PostComments);
