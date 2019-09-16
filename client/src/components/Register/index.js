import React from "react";
import { withRouter } from "react-router-dom";
import { createUser } from "../../services/api-helper";

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
            name="password"
            onChange={this.handleInput}
            value={this.state.password}
          />
          <hr />
          <button>Register</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Register);
