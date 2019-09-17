import React from "react";
import {
  deleteComment,
  getComments,
  writeComment,
  updateComment
} from "../../services/api-helper";

import "./CommentCard.css";

class CommentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      commentInput: false,
      editInput: false,
      comments: []
    };
  }

  componentDidMount = async () => {
    if (this.props.showComments) {
      let comments = await getComments(this.props.user_id, this.props.movie_id);
      this.setState({ comments });
    }
  };

  handleInput = async e => {
    e.preventDefault();
    let { value } = e.target;
    this.setState({ input: value });
  };

  handleComment = async e => {
    e.preventDefault();

    let commentObj = {
      body: this.state.input,
      movie_id: this.props.movie_id.toString()
    };
    await writeComment(commentObj);
    let comments = await getComments(this.props.user_id, this.props.movie_id);
    this.setState({ comments, commentInput: false });
  };

  handleDeleteComment = async e => {
    let id = parseInt(e.target.parentElement.getAttribute("id"));
    let movie_id = parseInt(e.target.parentElement.getAttribute("movie_id"));

    await deleteComment(movie_id, id);
    let comments = await getComments(this.props.user_id, this.props.movie_id);
    this.setState({ comments });
  };

  handleCommentInput = async e => {
    this.setState({ commentInput: true });
  };

  handleEditcomment = async e => {
    e.preventDefault();
    let text = e.target.parentElement.children[0].value;
    let id = parseInt(e.target.parentElement.getAttribute("id"));
    let movie_id = parseInt(e.target.parentElement.getAttribute("movie_id"));
    await updateComment(movie_id, id, text);
    let comments = await getComments(this.props.user_id, this.props.movie_id);
    this.setState({ comments, editInput: false });
  };

  hanldeTriggerEdit = e => {
    this.setState({ editInput: true });
  };

  handleCommentInputChange = e => {
    e.preventDefault();
    return e.target.value;
  };

  renderComments = () => {
    return this.state.comments.map(comment => {
      return (
        <div
          className="comment-wrapper"
          key={comment.id}
          id={comment.id}
          movie_id={this.props.movie_id}
        >
          <div className="comment-body">{comment.body}</div>
          {!this.state.editInput && this.props.isAuthed ? (
            <button className="edit-comment" onClick={this.hanldeTriggerEdit}>
              Edit
            </button>
          ) : null}
          {this.props.isAuthed && this.state.editInput ? (
            <form id={comment.id} movie_id={this.props.movie_id}>
              <input></input>
              <button className="edit-comment" onClick={this.handleEditcomment}>
                Edit
              </button>
            </form>
          ) : null}
          {this.props.isAuthed ? (
            <button
              className="delete-comment"
              onClick={this.handleDeleteComment}
            >
              x
            </button>
          ) : null}
        </div>
      );
    });
  };

  render() {
    return (
      <div className="entire-comment-wrapper">
        {this.props.isAuthed ? (
          <button
            className="add-comment-trigger"
            onClick={this.handleCommentInput}
          >
            Add Comment
          </button>
        ) : null}

        {this.props.isAuthed && this.state.commentInput ? (
          <form onSubmit={this.handleComment}>
            <input onChange={this.handleInput}></input>
            <button onClick={this.handleCommentInput}>Write Comment</button>
          </form>
        ) : null}

        {this.renderComments()}
      </div>
    );
  }
}

export default CommentCard;
