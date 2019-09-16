import React from "react";
import { Route, NavLink, Switch, withRouter } from "react-router-dom";

//Components
import Homepage from "../Homepage";
import Login from "../Login";
import Searchpage from "../Searchpage";
import Register from "../Register";
import Userspage from "../Userspage";
import Userprofile from "../Userprofile";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogoutButton = () => {
    this.props.history.push("/login");
  };

  handleLogout = async e => {
    e.preventDefault();
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    this.handleLogoutButton();
  };

  render() {
    return (
      <>
        <ul>
          <NavLink to="/home">Dashboard</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/search">Search</NavLink>
          <NavLink to="/users">Users</NavLink>
          <button onClick={this.handleLogout}>SignOut</button>
        </ul>
        <Switch>
          <Route path="/home" component={Homepage} />
          <Route exact path="/login" render={props => <Login />} />
          <Route exact path="/register" render={props => <Register />} />
          <Route exact path="/search" render={props => <Searchpage />} />
          <Route exact path="/users" render={props => <Userspage />} />
          <Route
            exact
            path="/users/:id"
            render={props => (
              <Userprofile {...props} id={props.match.params.id} />
            )}
          />
        </Switch>
      </>
    );
  }
}

export default withRouter(NavBar);
