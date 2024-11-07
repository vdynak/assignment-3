/*==================================================
src/components/UserProfile.js

The UserProfile component is used to demonstrate the use of Route and Link.
Note: You don't need to work on this file for the Assignment.
==================================================*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UserProfile.css';

class UserProfile extends Component {
  render() {
    return (
      <div className="profile-container">
        {/* Profile card */}
        <div className="profile-card">
          <img
            src="https://picsum.photos/120" 
            alt="User Avatar" 
            className="profile-avatar"
          />
          <h1 className="profile-title">User Profile</h1>

          <div className="profile-detail">
            <span className="detail-label">Username:</span>
            <span>{this.props.userName}</span>
          </div>
          
          <div className="profile-detail">
            <span className="detail-label">Member Since:</span>
            <span>{this.props.memberSince}</span>
          </div>

          <Link to="/" className="return-button">Return to Home</Link>
        </div>
      </div>
    );
  }
}

export default UserProfile;
