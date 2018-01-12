import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { upVoteComment, downVoteComment } from "../actions/vote_comment";
import VoteButton from "./VoteButton";
import { Popup, Icon } from "semantic-ui-react";
import { popupStyle } from "../utils/constants";

const popupSize = "large";

const CommentActions = props => {
  const {
    id,
    upVoteComment,
    downVoteComment,
    handleOpen,
    body,
    deleteComment
  } = props;

  return (
    <div>
      <VoteButton vote="like" voteClick={() => upVoteComment(id)} />
      <VoteButton vote="dislike" voteClick={() => downVoteComment(id)} />
      <Popup
        trigger={
          <Icon
            link
            name="edit"
            size={popupSize}
            color="yellow"
            onClick={() => handleOpen(id, body)}
          />
        }
        content="Edit comment"
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
            onClick={e => deleteComment(id)}
          />
        }
        content="Delete comment"
        style={popupStyle}
        inverted
      />
    </div>
  );
};

CommentActions.propTypes = {
  id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  handleOpen: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  upVoteComment: PropTypes.func.isRequired,
  downVoteComment: PropTypes.func.isRequired
};

export default connect(null, { upVoteComment, downVoteComment })(
  CommentActions
);
