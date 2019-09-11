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
    showFavesOfUser(1);
  };

  render() {
    return <div>HomePage</div>;
  }
}

export default Homepage;
