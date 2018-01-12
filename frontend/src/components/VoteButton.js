import React from "react";
import PropTypes from "prop-types";
import { Icon, Popup } from "semantic-ui-react";

const popupStyle = {
  borderRadius: 5,
  opacity: 0.9,
  padding: "1em"
};

const VoteButton = props => {
  const { vote } = props;
  let voteType = {};

  switch (vote) {
    case "like":
      voteType = {
        name: "thumbs up",
        color: "green",
        content: "Like it"
      };
      break;
    case "dislike":
      voteType = {
        name: "thumbs down",
        color: "red",
        content: "Dislike it"
      };
      break;
    default:
      voteType = {
        name: "",
        color: "",
        content: ""
      };
  }

  return (
    <Popup
      trigger={
        <Icon
          link
          name={voteType.name}
          size="large"
          color={voteType.color}
          onClick={props.voteClick}
        />
      }
      content={voteType.content}
      style={popupStyle}
      inverted
    />
  );
};

VoteButton.propTypes = {
  vote: PropTypes.string.isRequired,
  voteClick: PropTypes.func.isRequired
};

export default VoteButton;
