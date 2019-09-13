import React from "react";
import { getComment, deleteComment } from "../../services/api-helper";

class CommentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: [] };
  }

  componentDidMount() {
    this.setState({ comments: this.props.comments });
  }

  handleDeleteComment = async e => {
    let id = parseInt(e.target.parentElement.getAttribute("id"));
    let movie_id = parseInt(e.target.parentElement.getAttribute("movie_id"));

    console.log(await getComment(movie_id, id));
    console.log(await deleteComment(movie_id, id));
  };

  renderComments = () => {
    return this.props.comments.map(comment => {
      return (
        <div key={comment.id} id={comment.id} movie_id={this.props.movie_id}>
          {comment.body}
          <button>Edit Comment</button>
          <button onClick={this.handleDeleteComment}>Delete Comment</button>
        </div>
      );
    });
  };

  render() {
    return <div>{this.renderComments()}</div>;
  }
}

export default CommentCard;
