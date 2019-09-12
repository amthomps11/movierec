import React from "react";
import { showFavesOfUser } from "../../services/api-helper";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    await this.getFaves();
  };

  getFaves = () => {
    showFavesOfUser(localStorage.getItem("userId"));
  };

  render() {
    return <div>HomePage</div>;
  }
}

export default Homepage;
