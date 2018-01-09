import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Header } from "semantic-ui-react";
import fetchPostDetails from "../actions/fetch_post_details";

class EditPost extends Component {
  state = {
    title: "",
    body: ""
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchPostDetails(id);
  }

  render() {
    console.log(this.props);
    return (
      <Form>
        <Header size="large">Edit post</Header>
        <Form.Input
          label="Title"
          type="text"
          placeholder="Title"
          name="title"
        />
        <Form.TextArea
          label="Body"
          placeholder="Please enter some post body text"
          name="body"
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    postDetails: state.postDetails
  };
}

export default connect(mapStateToProps, { fetchPostDetails })(EditPost);
