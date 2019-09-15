import React from "react";
import { NavLink } from "react-router-dom";
import { getUsers, sendFriendRequest } from "../../services/api-helper";

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

  handleAddFriend = async friend_id => {
    await sendFriendRequest(friend_id);
  };

  renderUsers = () => {
    return this.state.users.map(user => {
      if (user.id !== parseInt(localStorage.getItem("userId")))
        return (
          <div key={user.id}>
            <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
            <button
              onClick={() => {
                this.handleAddFriend(user.id);
              }}
            >
              Add Friend
            </button>
          </div>
        );
    });
  };
  render() {
    return <div>{this.renderUsers()}</div>;
  }
}

export default Userspage;
