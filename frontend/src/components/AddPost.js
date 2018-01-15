import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import PropTypes from "prop-types";
import addPost from "../actions/add_post";
import fetchCategories from "../actions/fetch_categories";
import { Button, Form, Header } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { InputField, SelectField } from "react-semantic-redux-form";

// Generate UUID
const uuidv1 = require("uuid/v1");

class AddPost extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  /**
   * TODO: After form successfully submitted, clear form fields and navigate away
   */

  submitForm = values => {
    const { title, body, author, category } = values;

    const new_post = {
      id: uuidv1(),
      timestamp: Date.now(),
      title,
      body,
      author,
      category
    };

    this.props.addPost(new_post, () => {});
  };

  render() {
    const { handleSubmit } = this.props;

    const categories = this.props.categories.map(category => {
      return {
        key: category.name,
        text: _.upperFirst(category.name),
        value: category.name
      };
    });

    return (
      <Form onSubmit={handleSubmit(this.submitForm)}>
        <Header size="large">Add new post</Header>
        <Field
          name="title"
          component={InputField}
          label="Title"
          placeholder="Title"
          required
        />
        <Field
          name="body"
          component={InputField}
          label="Body"
          placeholder="Please enter some body text"
          required
        />
        <Field
          name="author"
          component={InputField}
          label="Author"
          placeholder="Author"
          required
        />
        <Field
          component={SelectField}
          name="category"
          label="Category"
          options={categories}
          onChange={this.props.handleChange}
          placeholder="Select category"
          required
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
    categories: state.categories
  };
}

AddPost.propTypes = {
  addPost: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  fetchCategories: PropTypes.func.isRequired
};

AddPost = connect(mapStateToProps, { addPost, fetchCategories })(AddPost);

export default reduxForm({ form: "addPost" })(AddPost);
