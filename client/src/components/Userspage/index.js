import React from "react";
import { Route, Router, NavLink } from "react-router-dom";
import { getUsers } from "../../services/api-helper";
import Userprofile from "../Userspage";
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
          <div key={user.id}>
            <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
          </div>
        </>
      );
    });
  };
  render() {
    console.log(this.props);
    return (
      <div>
        {this.renderUsers()}
        <Route
          exact
          path="/users/:id"
          render={props => (
            <Userprofile {...props} id={props.match.params.id} />
          )}
        />
      </div>
    );
  }
}

export default Userspage;
