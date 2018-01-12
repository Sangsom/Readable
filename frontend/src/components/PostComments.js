import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import fetchComments from "../actions/fetch_comments";
import deleteComment from "../actions/delete_comment";
import editComment from "../actions/edit_comment";
import VoteButton from "./VoteButton";
import { upVoteComment, downVoteComment } from "../actions/vote_comment";
import { popupStyle } from "../utils/constants";
import {
  Feed,
  Header,
  Icon,
  Modal,
  Button,
  Form,
  Popup
} from "semantic-ui-react";

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
    const { body } = this.state;
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
                <Feed.Extra>
                  <VoteButton
                    vote="like"
                    voteClick={() => this.props.upVoteComment(comment.id)}
                  />
                  <VoteButton
                    vote="dislike"
                    voteClick={() => this.props.downVoteComment(comment.id)}
                  />
                  <Modal
                    closeIcon
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    size="mini"
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    trigger={
                      <Icon
                        link
                        name="edit"
                        size="large"
                        color="yellow"
                        onClick={() =>
                          this.handleOpen(comment.id, comment.body)
                        }
                      />
                    }
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
                  <Popup
                    trigger={
                      <Icon
                        link
                        name="ban"
                        size="large"
                        color="red"
                        onClick={e => this.deleteComment(comment.id)}
                      />
                    }
                    content="Delete comment"
                    style={popupStyle}
                    inverted
                  />
                </Feed.Extra>
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
