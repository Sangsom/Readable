import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import fetchPostDetails from "../actions/fetch_post_details";
import deletePost from "../actions/delete_post";
import PostComments from "./PostComments";
import AddComment from "./AddComment";
import { Button, Item, Header, Confirm } from "semantic-ui-react";

class PostDetails extends Component {
  state = { id: "", open: false, redirect: false };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchPostDetails(id);
  }

  componentWillReceiveProps(nextProps) {
    const { id } = nextProps.postDetails;
    this.setState({ id });
  }

  show = () => this.setState({ open: true });

  handleCancel = () => {
    this.setState({ open: false });
  };

  handleConfirm = () => {
    const { id } = this.state;
    this.props.deletePost(id, () => {
      this.setState({ open: false, redirect: true });
    });
  };

  render() {
    const { postDetails } = this.props;
    const id = this.props.match.params.id;

    return (
      <div>
        {this.state.redirect ? (
          <Redirect to="/" />
        ) : (
          <Item.Group divided>
            <Header size="large">Post Details</Header>
            <Item>
              <Item.Image src="../assets/images/image.png" />
              <Item.Content>
                <Item.Header as="h2">{postDetails.title}</Item.Header>
                <Item.Description>{postDetails.body}</Item.Description>
                <Item.Meta>
                  <p>
                    <b>Author:</b> {postDetails.author}
                  </p>
                  <p>
                    <b>Category:</b> {postDetails.category}
                  </p>
                  <p>
                    <b>Date:</b>{" "}
                    {new Date(postDetails.timestamp).toDateString()}
                  </p>
                  <p>
                    <b>Vote score:</b> {postDetails.voteScore}
                  </p>
                  <p>
                    <b>Author:</b> {postDetails.author}
                  </p>
                  <p>
                    <b>Comment count:</b> {postDetails.commentCount}
                  </p>
                </Item.Meta>
                <Item.Extra>
                  <Button onClick={this.props.history.goBack}>Back</Button>
                  <Button primary as={Link} to={`/edit-post/${id}`}>
                    Edit
                  </Button>
                  <Button negative onClick={this.show}>
                    Delete
                  </Button>
                  <AddComment postId={id} />
                  <Confirm
                    dimmer="blurring"
                    open={this.state.open}
                    content="Are you sure you want to delete this post?"
                    cancelButton="Cancel"
                    confirmButton="Delete"
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                  />
                </Item.Extra>
              </Item.Content>
            </Item>
            <Item>
              {postDetails.commentCount > 0 ? (
                <PostComments id={id} />
              ) : (
                <p>No comments for this post</p>
              )}
            </Item>
          </Item.Group>
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

PostDetails.propTypes = {
  deletePost: PropTypes.func.isRequired,
  fetchPostDetails: PropTypes.func.isRequired,
  postDetails: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { fetchPostDetails, deletePost })(
  PostDetails
);
