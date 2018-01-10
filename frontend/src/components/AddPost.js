import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import addPost from "../actions/add_post";
import fetchCategories from "../actions/fetch_categories";
import { Button, Form, Header } from "semantic-ui-react";

// Generate UUID
const uuidv1 = require("uuid/v1");

class AddPost extends Component {
  state = {
    id: "",
    timestamp: "",
    title: "",
    body: "",
    author: "",
    category: ""
  };

  componentDidMount() {
    this.props.fetchCategories();
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  /**
   * TODO: Validate form fields
   * TODO: After form successfully submitted, clear form fields and navigate away
   */

  handleSubmit = e => {
    e.preventDefault();
    const { title, body, author, category } = this.state;

    const new_post = {
      id: uuidv1(),
      timestamp: Date.now(),
      title: title,
      body: body,
      author: author,
      category: category
    };

    this.props.addPost(new_post);
  };

  render() {
    const { title, body, author, category } = this.state;

    const categories = this.props.categories.map(category => {
      return {
        key: category.name,
        text: _.upperFirst(category.name),
        value: category.name
      };
    });

    return (
      <Form onSubmit={this.handleSubmit}>
        <Header size="large">Add new post</Header>
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
        <Form.Input
          label="Author"
          type="text"
          placeholder="Author"
          name="author"
          value={author}
          onChange={this.handleChange}
        />
        <Form.Select
          label="Category"
          options={categories}
          placeholder="Select category"
          name="category"
          value={category}
          onChange={this.handleChange}
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories
  };
}

export default connect(mapStateToProps, { addPost, fetchCategories })(AddPost);
