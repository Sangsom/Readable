import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import fetchCategories from "../actions/fetch_categories";
import { Header, Menu, Button } from "semantic-ui-react";

class Navigation extends Component {
  state = {
    activeItem: "all"
  };

  componentDidMount() {
    this.props.fetchCategories();
  }

  handleActiveItem = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;
    const { categories } = this.props;

    return (
      <div>
        <Header size="large">Categories</Header>
        <Menu vertical>
          <Menu.Item
            as={Link}
            to="/"
            name="all"
            active={activeItem === "all"}
          />
          {categories.map(category => (
            <Menu.Item
              as={Link}
              to={`/${category.path}`}
              name={category.name}
              key={category.name}
              active={activeItem === category.name}
              onClick={this.handleActiveItem}
            />
          ))}
        </Menu>
        <Button
          as={Link}
          to="/add-post/"
          basic
          color="green"
          content="Add New Post"
        />
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
