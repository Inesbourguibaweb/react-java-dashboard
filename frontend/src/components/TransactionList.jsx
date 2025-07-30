import React, { useState, useEffect } from 'react';
import api from '../services/api';
import TransactionForm from './TransactionForm.jsx';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

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
    <Paper>
      <Typography variant="h4" gutterBottom>
        Transactions
      </Typography>
      <TransactionForm onTransactionAdded={handleTransactionAdded} />
      <List>
        {transactions.map(transaction => (
          <ListItem key={transaction.id}>
            <ListItemText 
              primary={`Amount: ${transaction.montant}`} 
              secondary={`Date: ${transaction.date} - ${transaction.payee ? 'Paid' : 'Not Paid'}`} 
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TransactionList;
