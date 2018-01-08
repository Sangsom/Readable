import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import fetchPosts from "../actions/fetch_posts";
import { Button, Item, Label } from "semantic-ui-react";

const orderKeys = [
  {
    key: "voteScore",
    text: "VoteScore"
  },
  {
    key: "title",
    text: "Title"
  },
  {
    key: "timestamp",
    text: "Time"
  },
  {
    key: "author",
    text: "Author"
  },
  {
    key: "category",
    text: "Category"
  },
  {
    key: "commentCount",
    text: "Comments"
  }
];

class Posts extends Component {
  state = {
    orderKey: "voteScore",
    desc: true
  };

  orderBy = orderKey => {
    this.setState(state => ({
      ...state,
      orderKey,
      desc: state.orderKey === orderKey ? !state.desc : state.desc
    }));
  };

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const { posts } = this.props;
    const { orderBy } = this;
    const { orderKey, desc } = this.state;
    return (
      <div>
        <Item.Group divided>
          Posts:
          {posts
            .sort((a, b) => {
              if (desc) {
                return b[orderKey] < a[orderKey];
              }
              return a[orderKey] < b[orderKey];
            })
            .map(
              ({ id, title, body, timestamp, category, author, voteScore }) => (
                <Item key={id}>
                  <Item.Image src="./assets/images/image.png" />

                  <Item.Content>
                    <Item.Header as={Link} to={`/posts/${id}`}>
                      {title}
                    </Item.Header>
                    <Item.Meta>Category: {category}</Item.Meta>
                    <Item.Description>{body}</Item.Description>
                    <Item.Extra>
                      <Label>One</Label>
                      <Label>Two</Label>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              )
            )}
        </Item.Group>
        {orderKeys.map(({ key, text }) => (
          <button key={key} onClick={() => orderBy(key)}>
            {text}
            {key === orderKey && (desc ? "▲" : "▼")}
          </button>
        ))}
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

export default withRouter(connect(mapStateToProps, { fetchPosts })(Posts));
