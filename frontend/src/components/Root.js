import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Link, Switch, withRouter } from "react-router-dom";
import fetchCategories from "../actions/fetch_categories";
import fetchPosts from "../actions/fetch_posts";
import Navigation from "./Navigation";

class Root extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const { posts } = this.props;
    return (
      <div>
        <Navigation />
        Posts:
        <ul>{posts.map(post => <li key={post.id}>Title: {post.title}</li>)}</ul>
        <Switch>
          <Route path="/" exact component={() => <div>All Posts</div>} />
          <Route path="/react" component={() => <div>React</div>} />
          <Route path="/redux" component={() => <div>Redux</div>} />
          <Route path="/udacity" component={() => <div>Udacity</div>} />
          <Route component={() => <div>No Match</div>} />
        </Switch>
      </div>
    );
  }
}

// connects root reducer to props
function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default withRouter(connect(mapStateToProps, { fetchPosts })(Root));
