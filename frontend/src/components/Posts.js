import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import fetchPosts from "../actions/fetch_posts";
import { upVotePost, downVotePost } from "../actions/vote_post";
import { Button, Item, Header, Icon, Popup } from "semantic-ui-react";

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

const style = {
  borderRadius: 5,
  opacity: 0.9,
  padding: "1em"
};

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
          <Header size="large">Posts</Header>
          {posts
            .sort((a, b) => {
              if (desc) {
                return b[orderKey] < a[orderKey];
              }
              return a[orderKey] < b[orderKey];
            })
            .map(
              ({
                id,
                title,
                timestamp,
                category,
                author,
                voteScore,
                commentCount
              }) => (
                <Item key={id}>
                  <Item.Image src="./assets/images/image.png" />

                  <Item.Content>
                    <Item.Header as={Link} to={`/posts/${id}`}>
                      {title}
                    </Item.Header>
                    <Item.Meta>
                      <p>
                        <b>Author:</b> {author}
                      </p>
                      <p>
                        <b>Category:</b> {category}
                      </p>
                      <p>
                        <b>Date:</b> {new Date(timestamp).toDateString()}
                      </p>
                      <p>
                        <b>VoteScore:</b> {voteScore}
                      </p>
                      <p>
                        <b>Comment count:</b> {commentCount}
                      </p>
                    </Item.Meta>
                    <Item.Extra>
                      <Popup
                        trigger={
                          <Icon
                            link
                            name="thumbs up"
                            size="large"
                            color="green"
                            onClick={() => this.props.upVotePost(id)}
                          />
                        }
                        content="Like it"
                        style={style}
                        inverted
                      />

                      <Icon
                        link
                        name="thumbs down"
                        size="large"
                        color="red"
                        onClick={() => this.props.downVotePost(id)}
                      />
                    </Item.Extra>
                  </Item.Content>
                </Item>
              )
            )}
          <Item>
            <Button.Group>
              {orderKeys.map(({ key, text }) => (
                <Button key={key} onClick={() => orderBy(key)}>
                  {text}
                  {key === orderKey && (desc ? "▲" : "▼")}
                </Button>
              ))}
            </Button.Group>
          </Item>
        </Item.Group>
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

Posts.propTypes = {
  downVotePost: PropTypes.func.isRequired,
  upVotePost: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired
};

export default withRouter(
  connect(mapStateToProps, { fetchPosts, upVotePost, downVotePost })(Posts)
);
