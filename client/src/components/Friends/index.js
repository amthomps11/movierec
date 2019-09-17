import React from "react";
import { NavLink } from "react-router-dom";
import { getUser, getFriends } from "../../services/api-helper";

import "./Friends.css";

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = { friendIds: [], friends: [] };
  }

  componentDidMount = async () => {
    await this.getFriends();
  };

  getFriends = async () => {
    let user_id = localStorage.getItem("userId");
    let resp = await getFriends(user_id);
    let friendIds = resp.data;
    let friends = friendIds.map(async friendId => {
      let friend = await getUser(friendId.user2id);
      return friend;
    });
    let temp = await Promise.all(friends).then(function(values) {
      return values;
    });
    friends = temp;
    this.setState({ friendIds, friends });
  };

  renderFriends = () => {
    return this.state.friends.map(friend => {
      return (
        <div className="friend-div" key={friend.id}>
          <NavLink className="friend-link" to={`/users/${friend.id}`}>
            {friend.username}
          </NavLink>
        </div>
      );
    });
  };
  render() {
    return (
      <div className="friends-wrapper">
        <h2>Friends</h2>
        {this.renderFriends()}
      </div>
    );
  }
}

export default Friends;
