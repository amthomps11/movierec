import React from "react";
import axios from "axios";
require("dotenv").config();

// const API_KEY = process.env.REACT_APP_API_KEY;

// const API_KEY = "2aee743ec443e651b7c676b14cc46d1c";
class Searchpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "300",
      movies: []
    };
  }

  fetchData = async () => {
    let resp = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.input}&page=1&include_adult=false`
    );
    this.setState({ movies: [...resp.data.results] });
  };

  componentDidMount = async () => {
    await this.fetchData();
  };

  render() {
    return <div>Movies</div>;
  }
}

export default Searchpage;
