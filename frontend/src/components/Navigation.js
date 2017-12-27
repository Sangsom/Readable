import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import fetchCategories from "../actions/fetch_categories";

class Navigation extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    const { categories } = this.props;

    return (
      <div>
        Categories:
        <ul>
          <li>
            <Link to="/">Show all</Link>
          </li>
          {categories.map(category => (
            <li key={category.name}>
              <Link to={`/${category.path}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories
  };
}

export default connect(mapStateToProps, { fetchCategories })(Navigation);
