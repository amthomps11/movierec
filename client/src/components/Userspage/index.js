import React from "react";
import { Route, NavLink } from "react-router-dom";
import { getUsers } from "../../services/api-helper";
import Homepage from "../Homepage";

class Userspage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  componentDidMount = async () => {
    await this.setUsers();
  };

  setUsers = async () => {
    let resp = await getUsers();
    let users = resp.data;
    await this.setState({ users });
  };

  renderUsers = () => {
    return this.state.users.map(user => {
      return (
        <>
          <NavLink to="home">{user.username}</NavLink>

          <Route path="/home" />
        </>
      );
    });
  };
  render() {
    return <div>{this.renderUsers()}</div>;
  }
}

export default Userspage;
