import React from "react";
import {
  deleteComment,
  getComments,
  writeComment,
  updateComment
} from "../../services/api-helper";

class CommentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "", comments: [] };
  }

  componentDidMount = async () => {
    console.log(`commentcarduserid:${this.props.user_id}`);
    console.log(`commentcardmovieid:${this.props.movie_id}`);
    console.log(this.props.showComments);
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
    this.setState({ comments });
  };

  handleDeleteComment = async e => {
    let id = parseInt(e.target.parentElement.getAttribute("id"));
    let movie_id = parseInt(e.target.parentElement.getAttribute("movie_id"));

    await deleteComment(movie_id, id);
    let comments = await getComments(this.props.user_id, this.props.movie_id);
    this.setState({ comments });
  };

  handleEditcomment = async e => {
    let id = parseInt(e.target.parentElement.getAttribute("id"));
    let movie_id = parseInt(e.target.parentElement.getAttribute("movie_id"));

    await updateComment(movie_id, id);
    let comments = await getComments(this.props.user_id, this.props.movie_id);
    this.setState({ comments });
  };

  renderComments = () => {
    return this.state.comments.map(comment => {
      return (
        <div key={comment.id} id={comment.id} movie_id={this.props.movie_id}>
          {comment.body}
          {this.props.isAuthed ? (
            <button onClick={this.handleEditcomment}>Edit Comment</button>
          ) : null}
          {this.props.isAuthed ? (
            <button onClick={this.handleDeleteComment}>Delete Comment</button>
          ) : null}
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        {this.props.isAuthed ? (
          <form onSubmit={this.handleComment}>
            <input onChange={this.handleInput}></input>
            <button>Write Comment</button>
          </form>
        ) : null}
        {this.renderComments()}
      </div>
    );
  }
}

export default CommentCard;
