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
      credits: [], // List of credits
      updatedDescription: '', // New credit description
      updatedAmount: '', // New credit amount
    };
  }

  componentDidMount() {
    // Fetch data from the API endpoint when the component mounts
    fetch('https://johnnylaicode.github.io/api/credits.json')
      .then((response) => response.json())
      .then((data) => {
        // Update state with the fetched credits data
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

    // Create a new credit object
    const newCredit = {
      id: this.state.credits.length + 1, // Unique ID for the new credit
      description: updatedDescription,
      amount: parseFloat(updatedAmount).toFixed(2), // Format to two decimal places
      date: new Date().toISOString().slice(0, 10), // Current date in yyyy-mm-dd format
    };

    // Update credits list and clear input fields
    this.setState((prevState) => ({
      credits: [...prevState.credits, newCredit],
      updatedDescription: '',
      updatedAmount: '',
    }));

    // Update account balance
    this.props.updateBalance(parseFloat(updatedAmount));
  };

  render() {
    return (
      <div>
        <h1>Credits</h1>

        {/* Display list of credits */}
        <ul>
          {this.state.credits.map((credit) => (
            <li key={credit.id}>
              <p>Description: {credit.description}</p>
              <p>Amount: {parseFloat(credit.amount).toFixed(2)}</p>
              <p>Date: {new Date(credit.date).toISOString().slice(0, 10)}</p>
            </li>
          ))}
        </ul>

        {/* Input fields for adding new credit */}
        <h2>Add a New Credit</h2>
        <div>
          <input
            type="text"
            placeholder="Description"
            value={this.state.updatedDescription}
            onChange={this.handleDescriptionChange}
          />
          <input
            type="number"
            placeholder="Amount"
            value={this.state.updatedAmount}
            onChange={this.handleAmountChange}
          />
          <button onClick={this.addCredit}>Add Credit</button>
        </div>

        <br />
        <Link to="/">Return to Home</Link>
      </div>
    );
  }
}

export default Credits;
