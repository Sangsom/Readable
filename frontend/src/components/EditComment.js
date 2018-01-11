import React, { Component } from "react";
import { Modal, Button } from "semantic-ui-react";

class EditComment extends Component {
  state = { open: false };
  openModal = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });
  render() {
    return (
      <Modal
        size="mini"
        dimmer="blurring"
        open={this.state.open}
        onClose={this.handleClose}
      >
        <Modal.Header>Edit comment</Modal.Header>
        <Modal.Content>Edit here your comment: {this.props.id}</Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleClose}>Cancel</Button>
          <Button positive>Edit</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default EditComment;
