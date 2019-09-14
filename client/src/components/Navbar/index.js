import React from "react";
import { Route, NavLink, Switch } from "react-router-dom";

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

  render() {
    return (
      <>
        <ul>
          <NavLink to="/home">Dashboard</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">register</NavLink>
          <NavLink to="/search">Search</NavLink>
          <NavLink to="/users">Users</NavLink>
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

export default NavBar;
