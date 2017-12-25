import React, { Component } from "react";
import { connect } from 'react-redux';
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
            <li key={category.name}><a href={category.path}>{category.name}</a></li>
          ))}
        </ul>
        Posts:
        <ul>
          {posts.map(post => (
            <li key={post.id}>Title: {post.title}</li>
          ))}
        </ul>
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

export default connect(mapStateToProps, {fetchCategories, fetchPosts})(Root);
