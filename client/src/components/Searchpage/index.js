import React from "react";
import axios from "axios";
import Moviecard from "../Moviecard/Moviecard";
require("dotenv").config();

//components

// const API_KEY = process.env.REACT_APP_API_KEY;
const API_KEY = "2aee743ec443e651b7c676b14cc46d1c";

class Searchpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      movies: []
    };
  }

  fetchData = async () => {
    let resp = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.input}&page=1&include_adult=false`
    );
    await this.setState({ movies: [...resp.data.results] });
  };

  componentDidMount = async () => {};

  handleInput = e => {
    e.preventDefault();
    let { value } = e.target;
    this.setState({ input: value });
  };

  handleSearch = async e => {
    e.preventDefault();
    this.fetchData();
  };

  renderMovies = e => {
    return this.state.movies.map((movie, index) => {
      return (
        <Moviecard
          key={index}
          title={movie.title}
          description={movie.overview}
          imgUrl={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`}
          likeable={true}
          showComments={false}
        ></Moviecard>
      );
    });
  };

  render() {
    return (
      <div>
        <input onChange={this.handleInput}></input>
        <button onClick={this.handleSearch}>Search</button>
        Movies
        {this.state.movies !== [] ? this.renderMovies() : null}
      </div>
    );
  }
}

export default Searchpage;
