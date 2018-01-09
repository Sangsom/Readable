import React, { Component } from "react";
import { connect } from "react-redux";
import fetchPostDetails from "../actions/fetch_post_details";
import PostComments from "./PostComments";
import { Button, Item, Header } from "semantic-ui-react";

class PostDetails extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchPostDetails(id);
  }

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { postDetails } = this.props;
    const id = this.props.match.params.id;

    return (
      <div>
        <Item.Group divided>
          <Header size="large">Post Details</Header>
          <Item>
            <Item.Image src="../assets/images/image.png" />
            <Item.Content>
              <Item.Header as="h2">{postDetails.title}</Item.Header>
              <Item.Description>{postDetails.body}</Item.Description>
              <Item.Meta>
                <p>
                  <b>Author:</b> {postDetails.author}
                </p>
                <p>
                  <b>Category:</b> {postDetails.category}
                </p>
                <p>
                  <b>Date:</b> {new Date(postDetails.timestamp).toDateString()}
                </p>
                <p>
                  <b>Vote score:</b> {postDetails.voteScore}
                </p>
                <p>
                  <b>Author:</b> {postDetails.author}
                </p>
                <p>
                  <b>Comment count:</b> {postDetails.commentCount}
                </p>
              </Item.Meta>
              <Item.Extra>
                <Button onClick={this.goBack}>Back</Button>
                <Button primary>Edit</Button>
                <Button negative>Delete</Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>

        {postDetails.commentCount > 0 ? (
          <PostComments id={id} />
        ) : (
          <p>No comments for this post</p>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    postDetails: state.postDetails
  };
}

export default connect(mapStateToProps, { fetchPostDetails })(PostDetails);
