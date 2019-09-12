import React from "react";
import axios from "axios";
require("dotenv").config();

const API_KEY = process.env.REACT_APP_API_KEY;

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

  componentDidMount = async () => {
    await this.fetchData();
  };

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
    return this.state.movies.map(movie => {
      return <div>{movie.title}</div>;
    });
  };

  render() {
    return (
      <div>
        <input onChange={this.handleInput}></input>
        <button onClick={this.handleSearch}>Search</button>
        Movies
        {this.state.movies != [] ? this.renderMovies() : null}
      </div>
    );
  }
}

export default Searchpage;
