import React, { Component } from "react";
import { connect } from "react-redux";
import addPost from "../actions/add_post";
import { Button, Form } from "semantic-ui-react";

class AddPost extends Component {
  state = {
    id: "",
    timestamp: "",
    title: "",
    body: "",
    author: "",
    category: ""
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  /**
   * TODO: Generate categories
   * TODO: Generate UUID
   */

  handleSubmit = e => {
    e.preventDefault();
    const { title, body, author } = this.state;

    const new_post = {
      id: "hashsahsa",
      timestamp: Date.now(),
      title: title,
      body: body,
      author: author,
      category: "redux"
    };

    this.props.addPost(new_post);
  };

  render() {
    const { title, body, author } = this.state;

    const categories = [
      { key: "react", text: "React", value: "react" },
      { key: "redux", text: "Redux", value: "redux" },
      { key: "udacity", text: "Udacity", value: "udacity" }
    ];

    return (
      <Form onSubmit={this.handleSubmit}>
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
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

export default connect(null, { addPost })(AddPost);
