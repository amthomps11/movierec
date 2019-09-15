import React from "react";
import {
  showFavesOfUser,
  getFriendIds,
  getFriends
} from "../../services/api-helper";
import Moviecard from "../Moviecard/Moviecard";
import FriendRequests from "../FriendRequests";
import Friends from "../Friends";
import ViewReccomendations from "../ViewRecommendations";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { faves: [], friends: [] };
  }

  componentDidMount = async () => {
    await this.getFaves();
  };

  getFaves = async () => {
    let faves = await showFavesOfUser(localStorage.getItem("userId"));
    this.setState({ faves });
  };

  renderFaves = () => {
    let user_id = localStorage.getItem("userId");
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
          user_id={user_id}
        ></Moviecard>
      );
    });
  };

  render() {
    return (
      <div>
        {this.renderFaves()}
        <FriendRequests></FriendRequests>
        <Friends></Friends>
        <ViewReccomendations></ViewReccomendations>
      </div>
    );
  }
}

export default Homepage;
