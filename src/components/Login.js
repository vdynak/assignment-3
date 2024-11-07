/*==================================================
src/components/Login.js

The LogIn component is used to demonstrate the use of Redirect.
Note: You don't need to work on this file for the Assignment.
==================================================*/
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Login.css';

class LogIn extends Component {
  constructor(props) {  
    super(props);
    this.state = {
      user: {
        userName: this.props.user.userName,
        password: ''
      },
      redirect: false
    };
  }

  handleChange = (e) => {
    const updatedUser = { ...this.state.user };
    updatedUser.userName = e.target.value;
    this.setState({ user: updatedUser });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.mockLogIn(this.state.user);
    //Simualtes a mock login, doesnt actually login, but gives the appearance of this.
    this.setState({ redirect: true });
  };
  
  render() {
    if (this.state.redirect) {  
      return <Redirect to="/userProfile" />;
    }

    return (
      <div className="login-container">
        <div className="login-card">
          <h1>Login</h1>
          
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="userName">User Name</label>
              <input
                type="text"
                name="userName"
                defaultValue={this.props.user.userName}
                onChange={this.handleChange}
                className="form-input"
                id="userName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="form-input"
                id="password"
              />
            </div>
            <button className="login-button">Log In</button>
          </form>  
          <Link to="/" className="return-button">Return to Home</Link>
        </div>
      </div>
    );
  }
}

export default LogIn;
