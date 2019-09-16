import React from "react";
import Moviecard from "../Moviecard/Moviecard";
import { getAllRecommendations, getMovie } from "../../services/api-helper";

class ViewRecomendations extends React.Component {
  constructor(props) {
    super(props);
    this.state = { recIds: [], recs: [] };
  }

  componentDidMount = async () => {
    await this.getRecs();
  };

  getRecs = async () => {
    let recIds = await getAllRecommendations();
    let recs = recIds.map(async rec => {
      return await getMovie(rec.movie_id);
    });
    let temp = await Promise.all(recs).then(function(values) {
      return values;
    });
    recs = temp;
    this.setState({ recIds, recs });
  };

  renderRecs = () => {
    console.log(this.state.recs);
    console.log(typeof this.state.recs);
    return this.state.recs.map(movie => {
      console.log(movie);
      return (
        <Moviecard
          key={movie.id}
          movie_id={movie.id}
          title={movie.title}
          description={movie.description}
          imgUrl={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`}
          isAuthed={false}
          likeable={true}
          // showComments={true}
          // resetFaves={this.getFaves}
          // user_id={user_id}
        ></Moviecard>
      );
    });
  };

  render() {
    return (
      <div>
        The Recs
        {this.renderRecs()}
      </div>
    );
  }
}

export default ViewRecomendations;
