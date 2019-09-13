import React from "react";

class CommentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: [] };
  }

  renderComments = () => {
    return this.state.comments.map(comment => {
      return <div>{comment}</div>;
    });
  };

  render() {
    return <div>{this.renderComments()}</div>;
  }
}

export default CommentCard;
