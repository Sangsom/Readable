import React, { Component } from "react";
import { connect } from "react-redux";
import addComment from "../actions/add_comment";
import { Button, Modal, Form } from "semantic-ui-react";

const uuidv1 = require("uuid/v1");

class AddComment extends Component {
  state = {
    body: "",
    author: "",
    parentId: "",
    modalOpen: false
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

  handleSubmit = e => {
    e.preventDefault();
    const { body, author, parentId } = this.state;
    const new_comment = {
      id: uuidv1(),
      timestamp: Date.now(),
      body: body,
      author: author,
      parentId: parentId
    };

    this.props.addComment(new_comment, () => {
      this.handleClose();
    });
  };

  render() {
    const { author, body } = this.state;

    return (
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
              <Button onClick={this.handleClose}>Cancel</Button>
              <Button positive type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default connect(null, { addComment })(AddComment);
