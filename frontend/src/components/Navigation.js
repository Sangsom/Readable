import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import fetchCategories from "../actions/fetch_categories";
import { Header, Menu, Button, Item } from "semantic-ui-react";

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
    const categoriesList = [
      "all",
      ...categories.map(category => {
        return category.name;
      })
    ];

    return (
      <div className="navigation">
        <Item.Group divided>
          <Header size="large">Categories</Header>
          <Item>
            <Menu inverted vertical>
              {categoriesList.map(name => (
                <Menu.Item
                  as={Link}
                  to={name === "all" ? "" : `/${name}`}
                  name={name}
                  color="olive"
                  key={name}
                  active={activeItem === name}
                  onClick={this.handleActiveItem}
                />
              ))}
            </Menu>
          </Item>
          <Item>
            <Button
              as={Link}
              to="/add-post/"
              basic
              color="green"
              content="Add New Post"
            />
          </Item>
        </Item.Group>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories
  };
}

Navigation.propTypes = {
  categories: PropTypes.array.isRequired,
  fetchCategories: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { fetchCategories })(Navigation);
