import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import addComment from "../actions/add_comment";
import { Button, Modal, Form } from "semantic-ui-react";

const uuidv1 = require("uuid/v1");

class AddComment extends Component {
  state = {
    body: "",
    author: "",
    parentId: "",
    modalOpen: false,
    redirect: false
  };

  componentDidMount() {
    const { postId } = this.props;
    this.setState({ parentId: postId });
  }

  handleOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { body, author, parentId } = this.state;
    const new_comment = {
      id: uuidv1(),
      timestamp: Date.now(),
      body: body,
      author: author,
      parentId: parentId
    };

    this.props.addComment(new_comment, () => {
      this.setState({ redirect: true });
    });
  };

  render() {
    const { author, body, parentId } = this.state;

    return (
      <div>
        {this.state.redirect ? (
          <Redirect to={`/posts/${parentId}`} />
        ) : (
          <Modal
            dimmer="blurring"
            trigger={
              <Button onClick={this.handleOpen} positive>
                Add new comment
              </Button>
            }
            open={this.state.modalOpen}
            onClose={this.handleClose}
          >
            <Modal.Header>Post a comment to this post</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Input
                    label="Author"
                    type="text"
                    placeholder="Author"
                    name="author"
                    value={author}
                    onChange={this.handleChange}
                  />
                  <Form.TextArea
                    label="Comment"
                    placeholder="Leave a comment here"
                    name="body"
                    value={body}
                    onChange={this.handleChange}
                  />
                  <Button onClick={this.handleModalClose}>Cancel</Button>
                  <Button positive type="submit">
                    Submit
                  </Button>
                </Form>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        )}
      </div>
    );
  }
}

export default connect(null, { addComment })(AddComment);
