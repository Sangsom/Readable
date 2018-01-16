import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import fetchPosts from "../actions/fetch_posts";
import deletePost from "../actions/delete_post";
import { upVotePost, downVotePost } from "../actions/vote_post";
import { Button, Item, Header, Divider, Icon, Popup } from "semantic-ui-react";
import VoteButton from "./VoteButton";
import { popupStyle } from "../utils/constants";

const popupSize = "large";

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
    desc: true,
    open: false
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

  show = () => this.setState({ open: true });

  handleCancel = () => {
    this.setState({ open: false });
  };

  handleConfirm = id => {
    this.props.deletePost(id, () => {
      this.setState({ open: false });
    });
  };

  render() {
    const { posts, history } = this.props;
    const { orderBy } = this;
    const { orderKey, desc } = this.state;
    return (
      <div>
        {posts.length > 0 ? (
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
                        <VoteButton
                          vote="like"
                          voteClick={() => this.props.upVotePost(id)}
                        />
                        <VoteButton
                          vote="dislike"
                          voteClick={() => this.props.downVotePost(id)}
                        />
                        <Popup
                          trigger={
                            <Icon
                              link
                              name="edit"
                              size={popupSize}
                              color="yellow"
                              onClick={() => history.push(`/edit-post/${id}`)}
                            />
                          }
                          content="Edit post"
                          style={popupStyle}
                          inverted
                        />
                        <Popup
                          trigger={
                            <Icon
                              link
                              name="ban"
                              size={popupSize}
                              color="red"
                              onClick={() => this.handleConfirm(id)}
                            />
                          }
                          content="Delete post"
                          style={popupStyle}
                          inverted
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
        ) : (
          <div>
            <Header size="large">There are no posts in this category</Header>
            <Divider fitted />
          </div>
        )}
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
  deletePost: PropTypes.func.isRequired,
  downVotePost: PropTypes.func.isRequired,
  upVotePost: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired
};

export default withRouter(
  connect(mapStateToProps, {
    fetchPosts,
    upVotePost,
    downVotePost,
    deletePost
  })(Posts)
);
