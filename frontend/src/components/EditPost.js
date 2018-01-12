import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Form, Header } from "semantic-ui-react";
import fetchPostDetails from "../actions/fetch_post_details";
import editPost from "../actions/edit_post";

class EditPost extends Component {
  state = {
    id: "",
    title: "",
    body: ""
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchPostDetails(id);
  }

  componentWillReceiveProps(nextProps) {
    // Set the local state after post details are loaded
    const { id, title, body } = nextProps.postDetails;
    this.setState({
      id,
      title,
      body
    });
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = e => {
    e.preventDefault();
    const { id, title, body } = this.state;
    const post_updates = {
      id,
      title,
      body
    };
    this.props.editPost(post_updates, () => {});
  };

  render() {
    const { title, body } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Header size="large">Edit post</Header>
        <Form.Input
          label="Title"
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={this.handleChange}
        />
        <Form.TextArea
          label="Body"
          placeholder="Please enter some post body text"
          name="body"
          value={body}
          onChange={this.handleChange}
        />
        <Button onClick={this.props.history.goBack}>Cancel</Button>
        <Button positive type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    postDetails: state.postDetails
  };
}

EditPost.propTypes = {
  editPost: PropTypes.func.isRequired,
  fetchPostDetails: PropTypes.func.isRequired,
  postDetails: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { fetchPostDetails, editPost })(
  EditPost
);
