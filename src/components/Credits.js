/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Credits.css';

class Credits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credits: [],
      updatedDescription: '',
      updatedAmount: '',
    };
  }

  componentDidMount() {
    fetch('https://johnnylaicode.github.io/api/credits.json')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ credits: data });
      })
      .catch((error) => console.error('Error fetching credits:', error));
  }

  handleDescriptionChange = (event) => {
    this.setState({ updatedDescription: event.target.value });
  };

  handleAmountChange = (event) => {
    this.setState({ updatedAmount: event.target.value });
  };

  addCredit = () => {
    const { updatedDescription, updatedAmount } = this.state;
    if (!updatedDescription || !updatedAmount) {
      alert("Please enter both a description and an amount.");
      return;
    }

    const newCredit = {
      id: this.state.credits.length + 1,
      description: updatedDescription,
      amount: parseFloat(updatedAmount).toFixed(2),
      date: new Date().toISOString().slice(0, 10),
    };

    this.setState((prevState) => ({
      credits: [...prevState.credits, newCredit],
      updatedDescription: '',
      updatedAmount: '',
    }));

    this.props.updateBalance(parseFloat(updatedAmount));
  };

  render() {
    return (
      <div className="credits-container">
        {/* Header with account balance */}
        <header className="credits-header">
          <h1>Credits</h1>
          <div className="balance-display green-balance">
            <span className="balance-icon">💰</span>
            <span>Balance: ${this.props.accountBalance}</span>
          </div>
        </header>

        {/* Credits Table and Form */}
        <div className="credits-table-container">
          <table className="credits-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {this.state.credits.map((credit) => (
                <tr key={credit.id}>
                  <td>{credit.description}</td>
                  <td>${parseFloat(credit.amount).toFixed(2)}</td>
                  <td>{credit.date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add Credit Form */}
          <div className="add-credit-container">
            <h2>Add a New Credit</h2>
            <input
              type="text"
              placeholder="Description"
              value={this.state.updatedDescription}
              onChange={this.handleDescriptionChange}
              className="add-credit-input"
            />
            <input
              type="number"
              placeholder="Amount"
              value={this.state.updatedAmount}
              onChange={this.handleAmountChange}
              className="add-credit-input"
            />
            <button onClick={this.addCredit} className="add-credit-button">
              Add Credit
            </button>
          </div>

          <br />
          <Link to="/">Return to Home</Link>
        </div>
      </div>
    );
  }
}

export default Credits;
