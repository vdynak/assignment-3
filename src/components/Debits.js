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
import AccountBalance from './AccountBalance';

const Debits = (props) => {
  // State to store the fetched debits
  const [debits, setDebits] = useState([]);

  // Fetch debits from API on component mount
  useEffect(() => {
    fetch('https://johnnylaicode.github.io/api/debits.json')
      .then((response) => response.json())
      .then((data) => {
        // Format amounts to two decimal places
        const formattedDebits = data.map(debit => ({
          ...debit,
          amount: parseFloat(debit.amount).toFixed(2)
        }));
        setDebits(formattedDebits);
      })
      .catch((error) => console.error('Error fetching debits:', error));
  }, []);

  // Function to handle form submission for new debit
  const addDebit = (event) => {
    event.preventDefault();
    const description = event.target.description.value;
    const amount = parseFloat(event.target.amount.value).toFixed(2);
    const newDebit = {
      id: debits.length + 1,
      description,
      amount,
      date: new Date().toISOString().slice(0, 10)
    };

    // Update debits list with new debit and update balance in App component
    setDebits([...debits, newDebit]);
    props.updateBalance(-parseFloat(amount)); // Deduct from account balance in parent component
  };

  // Existing debitsView function to render list of debits
  let debitsView = () => {
    return debits.map((debit) => {
      let date = debit.date.slice(0, 10);
      return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
    });
  };

  return (
    <div>
      <h1>Debits</h1>
      <AccountBalance accountBalance={props.accountBalance} /> {/* Display account balance */}
      <ul>{debitsView()}</ul>
      
      <form onSubmit={addDebit}>
        <input type="text" name="description" placeholder="Description" required />
        <input type="number" name="amount" step="0.01" placeholder="Amount" required />
        <button type="submit">Add Debit</button>
      </form>
      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Debits;
