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
  constructor() {  
    super(); 
    this.state = {
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      },
      accountBalance: 0,
    };
  }

  componentDidMount() {
    // Fetch initial credits and debits from API on each reload
    fetch('https://johnnylaicode.github.io/api/credits.json')
      .then(response => response.json())
      .then(data => {
        const credits = data.map(credit => ({
          ...credit,
          amount: parseFloat(credit.amount),
        }));
        this.setState({ creditList: credits }, this.updateAccountBalance);
      })
      .catch(error => console.error('Error fetching credits:', error));

    fetch('https://johnnylaicode.github.io/api/debits.json')
      .then(response => response.json())
      .then(data => {
        const debits = data.map(debit => ({
          ...debit,
          amount: parseFloat(debit.amount),
        }));
        this.setState({ debitList: debits }, this.updateAccountBalance);
      })
      .catch(error => console.error('Error fetching debits:', error));
  }

  calculateTotalCredits = () => {
    return this.state.creditList.reduce((acc, credit) => acc + credit.amount, 0);
  };

  calculateTotalDebits = () => {
    return this.state.debitList.reduce((acc, debit) => acc + debit.amount, 0);
  };

  updateAccountBalance = () => {
    const totalCredits = this.calculateTotalCredits();
    const totalDebits = this.calculateTotalDebits();
    const balance = totalCredits - totalDebits;

    // Update the account balance and round to 2 decimal places
    this.setState({ accountBalance: parseFloat(balance.toFixed(2)) });
  };

  // Function to add a new credit (won't persist on reload)
  updatedBalance = (amount, description) => {
    const newCredit = {
      id: this.state.creditList.length + 1,
      description,
      amount: parseFloat(amount),
      date: new Date().toISOString().slice(0, 10),
    };

    this.setState(
      (prevState) => ({ creditList: [...prevState.creditList, newCredit] }),
      this.updateAccountBalance
    );
  };

  // Function to add a new debit (won't persist on reload)
  updateBalance = (amount, description) => {
    const parsedAmount = parseFloat(amount);
    const newDebit = {
      id: this.state.debitList.length + 1,
      description,
      amount: parsedAmount,
      date: new Date().toISOString().slice(0, 10),
    };

    this.setState(
      (prevState) => ({ debitList: [...prevState.debitList, newDebit] }),
      this.updateAccountBalance
    );
  };

  render() {  
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance.toFixed(2)} />);
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />);
    const CreditsComponent = () => (
      <Credits 
        credits={this.state.creditList} 
        updateBalance={this.updatedBalance}
        accountBalance={this.state.accountBalance.toFixed(2)}
      />
    );
    const DebitsComponent = () => (
      <Debits 
        debits={this.state.debitList}
        updateBalance={this.updateBalance}
        accountBalance={this.state.accountBalance.toFixed(2)}
      />
    );

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
