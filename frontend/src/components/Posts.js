import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import fetchPosts from "../actions/fetch_posts";

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
        Posts:
        <ul>
          {posts
            .sort((a, b) => {
              if (desc) {
                return b[orderKey] < a[orderKey];
              }
              return a[orderKey] < b[orderKey];
            })
            .map(({ id, title, timestamp, category, author, voteScore }) => (
              <li key={id}>
                Title: {title} by {author} at {timestamp} in {category} with a
                score of {voteScore}
              </li>
            ))}
        </ul>
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
