import React from "react";
import { withRouter } from "react-router-dom";
import { createUser, loginUser } from "../../services/api-helper";
import decode from "jwt-decode";

import "./Register.css";
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: ""
    };
  }

  handleRegisterButton = () => {
    this.props.history.push("/home");
  };

  handleRegister = async e => {
    e.preventDefault();
    await createUser({ user: this.state });
    let user = {
      username: this.state.username,
      password: this.state.password
    };
    const userData = await loginUser(user);
    decode(userData.data.token);
    localStorage.setItem("jwt", userData.data.token);
    localStorage.setItem("userId", userData.data.userId);
    this.handleRegisterButton();
  };

  handleInput = async e => {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState(prevState => ({
      ...prevState.authData,
      [name]: value
    }));
  };

  render() {
    return (
      <div className="register-component-wrapper">
        <div className="register-container">
          <h2>Register</h2>
          <hr />
          <form onSubmit={this.handleRegister}>
            <p>Username:</p>
            <input
              name="username"
              onChange={this.handleInput}
              value={this.state.username}
            />
            <p>Email:</p>
            <input
              name="email"
              onChange={this.handleInput}
              value={this.state.email}
            />
            <p>Password:</p>
            <input
              type="password"
              name="password"
              onChange={this.handleInput}
              value={this.state.password}
            />
            <hr />
            <button className="register-button">Register</button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
