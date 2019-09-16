import React from "react";
import {
  getFriendRequests,
  getUser,
  acceptFriendRequest
} from "../../services/api-helper";

class FriendRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = { friendIds: [], friends: [] };
  }

  componentDidMount = async () => {
    await this.getRequests();
  };

  getRequests = async () => {
    let user_id = localStorage.getItem("userId");
    let resp = await getFriendRequests(user_id);
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

  acceptRequest = async friend_id => {
    await acceptFriendRequest(friend_id);
  };

  renderRequests = () => {
    return this.state.friends.map(friend => {
      return (
        <div key={friend.id}>
          <div>{friend.username}</div>
          <button
            onClick={() => {
              this.acceptRequest(friend.id);
            }}
          >
            Accept Request
          </button>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="friend-request-wrapper">
        FriendRequests
        {this.renderRequests()}
      </div>
    );
  }
}

export default FriendRequests;
