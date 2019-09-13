import React from "react";

class CommentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: [] };
  }

  componentDidMount() {
    this.setState({ comments: this.props.comments });
  }

  renderComments = () => {
    return this.props.comments.map(comment => {
      console.log(comment);
      return <div>{comment.body}</div>;
    });
  };

  render() {
    return <div>{this.renderComments()}</div>;
  }
}

export default CommentCard;
