import React, { Component } from "react";
import { connect } from "react-redux";
import addPost from "../actions/add_post";

class AddPost extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { refs } = this;

    const new_post = {
      id: refs.id.value,
      timestamp: Date.now(),
      title: refs.title.value,
      body: refs.body.value,
      author: refs.author.value,
      category: refs.category.value
    };

    this.props.addPost(new_post);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>ID</label>
          <input type="text" ref="id" name="id" />
          <br />
          <label>Title</label>
          <input type="text" ref="title" name="title" />
          <br />
          <label htmlFor="">Body</label>
          <input type="text" ref="body" name="body" />
          <br />
          <label htmlFor="">Author</label>
          <input type="text" ref="author" name="author" />
          <br />
          <label htmlFor="">Category</label>
          <input type="text" ref="category" name="category" />
          <br />
          <input type="submit" value="Submit" />
          <br />
        </form>
      </div>
    );
  }
}

export default connect(null, { addPost })(AddPost);
