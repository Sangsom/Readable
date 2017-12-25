import React, { Component } from "react";
import { connect } from 'react-redux';
import fetchCategories from '../actions/fetch_categories'

class Root extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    const { categories } = this.props;
    console.log(categories)
    return (
      <div>Categories: 
        <ul>
          {categories.map(category => (
            <li key={category.name}>{category.name}</li>
          ))}
        </ul>
      </div>
    )
  }
}

// connects root reducer to props
function mapStateToProps(state) {
  return {
    categories: state.categories
  }
}

export default connect(mapStateToProps, {fetchCategories})(Root);
