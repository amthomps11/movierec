import React from "react";
import { createMovie, likeMovie, getMovieId } from "../../services/api-helper";

class Moviecard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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

  render() {
    return (
      <div>
        <div>{this.props.title}</div>
        <div>{this.props.description}</div>
        <button onClick={this.handleLike}>Like</button>
      </div>
    );
  }
}

export default Moviecard;
