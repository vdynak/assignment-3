/*==================================================
src/components/Home.js

The Home component is used to demonstrate the use of Link.
==================================================*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        {/* Full-width header with background color and account balance */}
        <header className="home-header">
          <h1>Bank of React</h1>
          <div className="balance-display">
            <span className="balance-icon">💰</span>
            <span>Balance: ${this.props.accountBalance}</span>
          </div>
        </header>

        {/* 2x2 cards */}
        <div className="card-grid">
          <Link to="/userProfile" className="card">
            <img src="https://picsum.photos/100/100?1" alt="User Profile" />
            <h2>User Profile</h2>
            <p>View and edit your profile information</p>
          </Link>

          <Link to="/login" className="card">
            <img src="https://picsum.photos/100/100?2" alt="Login" />
            <h2>Login</h2>
            <p>Access your account securely</p>
          </Link>

          <Link to="/credits" className="card">
            <img src="https://picsum.photos/100/100?3" alt="Credits" />
            <h2>Credits</h2>
            <p>Manage and view your credits</p>
          </Link>

          <Link to="/debits" className="card">
            <img src="https://picsum.photos/100/100?4" alt="Debits" />
            <h2>Debits</h2>
            <p>Track and monitor your debits</p>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
