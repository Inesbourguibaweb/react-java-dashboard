import React, { useState, useEffect } from 'react';
import api from '../services/api';
import TransactionForm from './TransactionForm';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    api.get('/transactions')
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the transactions!', error);
      });
  };

  const handleTransactionAdded = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  return (
    <div>
      <TransactionForm onTransactionAdded={handleTransactionAdded} />
      <h2>Transactions</h2>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            {transaction.date} - {transaction.montant} - {transaction.payee ? 'Payee' : 'Non Payee'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
