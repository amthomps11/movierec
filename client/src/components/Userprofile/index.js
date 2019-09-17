import React from "react";
import { showFavesOfUser } from "../../services/api-helper";
import Moviecard from "../Moviecard/Moviecard";

class Userprofile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { faves: [] };
  }

  componentDidMount = async () => {
    await this.getFaves();
  };

  getFaves = async () => {
    let faves = await showFavesOfUser(this.props.id);
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
          imgUrl={movie.imgUrl}
          isAuthed={false}
          likeable={true}
          showComments={true}
          user_id={this.props.id}
        ></Moviecard>
      );
    });
  };

  render() {
    return <div>{this.renderFaves()}</div>;
  }
}

export default Userprofile;
