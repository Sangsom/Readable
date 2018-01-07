import React, { Component } from "react";
import { connect } from "react-redux";
import fetchPostDetails from "../actions/fetch_post_details";

/**
 * TODO: How to convert post details to later conveniently print them out???
 */

class PostDetails extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchPostDetails(id);
  }

  render() {
    const { postDetails } = this.props;
    return (
      <div>
        These are selected post details:
        <ul>{postDetails.map(post => <li>{post.title}</li>)}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    postDetails: state.posts
  };
}

export default connect(mapStateToProps, { fetchPostDetails })(PostDetails);
