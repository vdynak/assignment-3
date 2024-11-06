/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 1234567.89,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  // Function to update account balance and credit list
  updatedBalance = (amount, description) => {
    const newCredit = {
      id: this.state.creditList.length + 1, // Unique ID for the new credit
      description: description,
      amount: parseFloat(amount).toFixed(2), // Round to two decimal places
      date: new Date().toISOString().slice(0, 10), // Current date in yyyy-mm-dd format
    };

    // Update the state with new credit and adjusted balance
    this.setState((prevState) => ({
      accountBalance: parseFloat(prevState.accountBalance + parseFloat(amount)).toFixed(2),
      creditList: [...prevState.creditList, newCredit]
    }));
  };

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />);
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />);
    const CreditsComponent = () => (
      <Credits 
        credits={this.state.creditList} 
        updateBalance={this.updatedBalance} // Pass update function to Credits
      />
    );
    const DebitsComponent = () => (<Debits debits={this.state.debitList} />);

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/assignment-3">
        <div>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/credits" render={CreditsComponent} />
          <Route exact path="/debits" render={DebitsComponent} />
        </div>
      </Router>
    );
  }
}

export default App;
