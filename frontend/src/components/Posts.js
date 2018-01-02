import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import fetchPosts from "../actions/fetch_posts";
import orderByVotescore from "../actions/order_by_votescore";
import orderByTimestamp from "../actions/order_by_timestamp";

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const { posts } = this.props;
    return (
      <div>
        Posts:
        <ul>{posts.map(post => <li key={post.id}>Title: {post.title}</li>)}</ul>
        <button onClick={this.props.orderByVotescore}>VoteScore</button>
        <button onClick={this.props.orderByTimestamp}>Timestamp</button>
      </div>
    );
  }
}

// connects root reducer to props
function mapStateToProps({ posts }, { match }) {
  const category = match.params.category;
  return {
    posts: category ? posts.filter(post => post.category === category) : posts
  };
}

export default withRouter(
  connect(mapStateToProps, { fetchPosts, orderByVotescore, orderByTimestamp })(
    Posts
  )
);
