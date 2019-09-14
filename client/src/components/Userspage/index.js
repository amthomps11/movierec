import React from "react";
import { NavLink } from "react-router-dom";
import { getUsers } from "../../services/api-helper";

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
        <div key={user.id}>
          <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
        </div>
      );
    });
  };
  render() {
    return <div>{this.renderUsers()}</div>;
  }
}

export default Userspage;
