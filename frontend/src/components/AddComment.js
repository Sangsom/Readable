import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import addComment from "../actions/add_comment";
import { Button, Modal, Form } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { InputField } from "react-semantic-redux-form";

// Generate UUID
const uuidv1 = require("uuid/v1");

// Form validation rules
const validate = values => {
  const errors = {};
  if (!values.author) {
    errors.author = "Author is Required";
  }

  if (!values.body) {
    errors.body = "Body is Required";
  }
  return errors;
};

class AddComment extends Component {
  state = {
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

  submitForm = values => {
    const { parentId } = this.state;
    const { body, author } = values;
    const new_comment = {
      id: uuidv1(),
      timestamp: Date.now(),
      body: body,
      author: author,
      parentId: parentId
    };
    this.props.addComment(new_comment, () => {
      this.handleClose();
      this.props.reset();
    });
  };

  render() {
    const { handleSubmit } = this.props;

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
            <Form onSubmit={handleSubmit(this.submitForm)}>
              <Field
                name="author"
                component={InputField}
                label="Author"
                placeholder="Author"
                required
              />
              <Field
                name="body"
                component={InputField}
                label="Comment"
                placeholder="Leave a comment here"
                required
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

AddComment.propTypes = {
  postId: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

AddComment = connect(null, { addComment })(AddComment);

export default reduxForm({ form: "addComment", validate })(AddComment);
