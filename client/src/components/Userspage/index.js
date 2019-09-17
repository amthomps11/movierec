import React from "react";
import { NavLink } from "react-router-dom";
import { getUsers, sendFriendRequest } from "../../services/api-helper";

import "./Userspage.css";
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
          <div className="user-wrapper" key={user.id}>
            <h2>{user.username}</h2>
            <button
              onClick={() => {
                this.handleAddFriend(user.id);
              }}
            >
              Invite To Follow You
            </button>
          </div>
        );
    });
  };
  render() {
    return <div className="userlist-wrapper">{this.renderUsers()}</div>;
  }
}

export default Userspage;
