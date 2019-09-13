import React from "react";
import {
  createMovie,
  likeMovie,
  getMovieId,
  writeComment,
  getComments
} from "../../services/api-helper";
import CommentCard from "../CommentCard";

class Moviecard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "", comments: [] };
  }

  componentDidMount = async () => {
    let comments = await getComments(this.props.movie_id);
    this.setState({ comments });
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
    let comments = await getComments(this.props.movie_id);
    this.setState({ comments });
  };

  render() {
    return (
      <div>
        <div>{this.props.title}</div>
        <div>{this.props.description}</div>
        <button onClick={this.handleLike}>Like</button>
        <form onSubmit={this.handleComment}>
          <input onChange={this.handleInput}></input>
          <button>Write Comment</button>
        </form>
        <CommentCard comments={this.state.comments}></CommentCard>
      </div>
    );
  }
}

export default Moviecard;
