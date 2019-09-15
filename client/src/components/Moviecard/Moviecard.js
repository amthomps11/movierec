import React from "react";
import {
  createMovie,
  likeMovie,
  getMovieId,
  getComments,
  unlikeMovie
} from "../../services/api-helper";
import CommentCard from "../CommentCard";

class Moviecard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "", comments: [] };
  }

  componentDidMount = async () => {
    if (this.props.showComments) {
      let comments = await getComments(this.props.user_id, this.props.movie_id);
      await this.setState({ comments });
    }
  };

  handleLike = async e => {
    e.preventDefault();
    let id = null;
    let movieObj = {
      movie: {
        title: this.props.title,
        description: this.props.description,
        imgUrl: this.props.imgUrl
      }
    };

    id = await getMovieId(this.props.title);
    if (id === "nomovie") {
      const newMovie = await createMovie(movieObj);
      id = newMovie.id;
    }
    await likeMovie(id);
  };

  handleUnlike = async e => {
    e.preventDefault();
    await unlikeMovie(this.props.movie_id);
    this.props.resetFaves();
  };

  handleInput = async e => {
    e.preventDefault();
    let { value } = e.target;
    this.setState({ input: value });
  };

  render() {
    return (
      <div>
        <div>{this.props.title}</div>
        <div>{this.props.description}</div>
        {this.props.likeable ? (
          <button onClick={this.handleLike}>Like</button>
        ) : (
          <button onClick={this.handleUnlike}>Unlike</button>
        )}
        {this.props.showComments ? (
          <CommentCard
            movie_id={this.props.movie_id}
            user_id={this.props.user_id}
            handleDelete={this.handleDeleteComment}
            comments={this.state.comments}
            isAuthed={this.props.isAuthed}
            showComments={this.props.showComments}
          ></CommentCard>
        ) : null}
      </div>
    );
  }
}

export default Moviecard;
