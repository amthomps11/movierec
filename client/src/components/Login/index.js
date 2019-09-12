import React from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import decode from "jwt-decode";
import { loginUser } from "../../services/api-helper";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authData: { username: "", password: "" }
    };
  }

  handleLoginButton = () => {
    this.props.history.push("/home");
  };

  handleLogin = async e => {
    e.preventDefault();
    const userData = await loginUser(this.state.authData);
    console.log(userData);
    decode(userData.data.token);
    localStorage.setItem("jwt", userData.data.token);
    localStorage.setItem("userId", userData.data.userId);

    this.handleLoginButton();
  };

  handleInput = async e => {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState(prevState => ({
      authData: {
        ...prevState.authData,
        [name]: value
      }
    }));
  };

  render() {
    return (
      <div className="auth-container">
        <h2>login</h2>
        <hr />
        <form onSubmit={this.handleLogin}>
          <p>Username:</p>
          <input
            name="username"
            onChange={this.handleInput}
            value={this.state.username}
          />
          <p>Password:</p>
          <input
            name="password"
            onChange={this.handleInput}
            value={this.state.password}
          />
          <hr />
          <button>Login</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
