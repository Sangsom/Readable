import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import addComment from "../actions/add_comment";
import { Button, Modal, Form, Message } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";

const uuidv1 = require("uuid/v1");

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
              <Field name="author" component={renderAuthorField} />
              <Field name="body" component={renderBodyField} />
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

const validate = values => {
  const errors = {};
  if (!values.author || values.author.length === 0) {
    errors.author = "Required";
  } else if (values.author.length > 15) {
    errors.author = "Must be 15 characters or less";
  }
  if (!values.body || values.body.length === 0) {
    errors.body = "Required";
  } else if (values.body.length > 150) {
    errors.body = "Your comment must but up to 150 characters long.";
  }

  return errors;
};

const warn = values => {
  const warnings = {};

  return warnings;
};

const renderAuthorField = ({
  input: { value, onChange },
  meta: { touched, error, warning }
}) => {
  return (
    <div>
      <Form.Input
        error={touched && error ? true : false}
        placeholder="Author"
        name="author"
        label="Author"
        value={value}
        onChange={onChange}
      />
      {touched &&
        ((error && (
          <Message color="red" size="mini">
            {error}
          </Message>
        )) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};

const renderBodyField = ({
  input: { value, onChange },
  meta: { touched, error, warning }
}) => {
  return (
    <div>
      <Form.TextArea
        error={touched && error ? true : false}
        label="Comment"
        placeholder="Leave a comment here"
        name="body"
        value={value}
        onChange={onChange}
      />
      {touched &&
        ((error && (
          <Message color="red" size="mini">
            {error}
          </Message>
        )) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};

AddComment.propTypes = {
  postId: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

AddComment = connect(null, { addComment })(AddComment);

export default reduxForm({ form: "addComment", validate, warn })(AddComment);
