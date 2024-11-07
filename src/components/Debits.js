/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Debits.css';

const Debits = (props) => {
  // State to store debits data from API/user entries
  const [debits, setDebits] = useState([]);

  // Debits data from API
  useEffect(() => {
    fetch('https://johnnylaicode.github.io/api/debits.json')
      .then((response) => response.json())
      .then((data) => {
        // Interpret as float, two decimal places
        const formattedDebits = data.map(debit => ({
          ...debit,
          amount: parseFloat(debit.amount).toFixed(2)
        }));
        // Update state with formatted data
        setDebits(formattedDebits);
      })
      .catch((error) => console.error('Error fetching debits:', error));
  }, []);

  // Function to handle adding a new debit entry
  const addDebit = (event) => {
    event.preventDefault();
    
    // Extract input values
    const description = event.target.description.value;
    const amount = parseFloat(event.target.amount.value).toFixed(2);
    
    // Create a new debit object with provided data
    const newDebit = {
      id: debits.length + 1, // Incremental ID for new debit
      description,
      amount,
      date: new Date().toISOString().slice(0, 10)
    };

    // Update debits state to include new debit entry
    setDebits([...debits, newDebit]);
    
    // Update account balance in the parent component by subtracting the new debit amount
    props.updateBalance(parseFloat(amount)); 
  };

  return (
    <div className="debits-container">
      {/* Header with page title and current account balance */}
      <header className="debits-header">
        <h1>Debits</h1>
        <div className="balance-display red-balance">
          <span className="balance-icon">💰</span>
          <span>Balance: ${props.accountBalance}</span>
        </div>
      </header>

      {/* Table displaying current list of debits */}
      <div className="debits-table-container">
        <table className="debits-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {/* Map over debits array to display each debit entry in a row */}
            {debits.map((debit) => (
              <tr key={debit.id}>
                <td>{debit.description}</td>
                <td>${debit.amount}</td>
                <td>{debit.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Form for adding a new debit entry */}
        <div className="add-debit-container">
          <h2>Add a New Debit</h2>
          <form onSubmit={addDebit}>
            {/* Input for debit description */}
            <input
              type="text"
              name="description"
              placeholder="Description"
              required
              className="add-debit-input"
            />
            {/* Input for debit amount */}
            <input
              type="number"
              name="amount"
              step="0.01"
              placeholder="Amount"
              required
              className="add-debit-input"
            />
            {/* Submit button to add the new debit */}
            <button type="submit" className="add-debit-button">Add Debit</button>
          </form>
        </div>

        <br />
        {/* Link to return to the home page */}
        <Link to="/">Return to Home</Link>
      </div>
    </div>
  );
};

export default Debits;
