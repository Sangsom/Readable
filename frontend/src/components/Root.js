import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route, Link, withRouter } from 'react-router-dom';
import fetchCategories from '../actions/fetch_categories'
import fetchPosts from '../actions/fetch_posts'

class Root extends Component {
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }

  render() {
    const { categories, posts } = this.props;
    console.log(posts)
    return (
      <div>
        Categories: 
        <ul>
          {categories.map(category => (
            <li key={category.name}><Link to={`/${category.path}`}>{category.name}</Link></li>
          ))}
        </ul>
        Posts:
        <ul>
          {posts.map(post => (
            <li key={post.id}>Title: {post.title}</li>
          ))}
        </ul>

        <Route path="/react" component={() => (
          <div>React</div>
        )} />
        <Route path="/redux" component={() => (
          <div>Redux</div>
        )} />
        <Route path="/udacity" component={() => (
          <div>Udacity</div>
        )} />
      </div>
    )
  }
}

// connects root reducer to props
function mapStateToProps(state) {
  return {
    categories: state.categories,
    posts: state.posts
  }
}

export default withRouter(connect(mapStateToProps, {fetchCategories, fetchPosts})(Root));
