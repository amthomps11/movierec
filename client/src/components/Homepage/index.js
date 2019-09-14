import React from "react";
import { showFavesOfUser } from "../../services/api-helper";
import Moviecard from "../Moviecard/Moviecard";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { faves: [] };
  }

  componentDidMount = async () => {
    await this.getFaves();
  };

  getFaves = async () => {
    let faves = await showFavesOfUser(localStorage.getItem("userId"));
    this.setState({ faves });
  };

  renderFaves = () => {
    return this.state.faves.map(movie => {
      return (
        <Moviecard
          key={movie.id}
          movie_id={movie.id}
          title={movie.title}
          description={movie.description}
          imgUrl={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`}
          isAuthed={true}
          likeable={false}
          showComments={true}
          resetFaves={this.getFaves}
        ></Moviecard>
      );
    });
  };

  render() {
    return <div>{this.renderFaves()}</div>;
  }
}

export default Homepage;
