import React from "react";
import { Route, NavLink, Switch, withRouter } from "react-router-dom";

//Components
import Homepage from "../Homepage";
import Login from "../Login";
import Searchpage from "../Searchpage";
import Register from "../Register";
import Userspage from "../Userspage";
import Userprofile from "../Userprofile";

//css
import "./Navbar.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
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
        <ul className="navbar">
          <NavLink activeClassName="active" className="navbar-link" to="/home">
            Dashboard
          </NavLink>
          <NavLink activeClassName="active" className="navbar-link" to="/login">
            Login
          </NavLink>
          <NavLink
            activeClassName="active"
            className="navbar-link"
            to="/register"
          >
            Register
          </NavLink>
          <NavLink
            activeClassName="active"
            className="navbar-link"
            to="/search"
          >
            Search
          </NavLink>
          <NavLink activeClassName="active" className="navbar-link" to="/users">
            Users
          </NavLink>
          <button className="signout-button" onClick={this.handleLogout}>
            Signout
          </button>
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
