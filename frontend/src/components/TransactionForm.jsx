import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { TextField, Button, Box, Typography, Checkbox, FormControlLabel, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const TransactionForm = ({ onTransactionAdded }) => {
  const [transaction, setTransaction] = useState({
    date: '',
    montant: '',
    payee: false,
    clientId: '',
    collaborateurId: ''
  });
  const [clients, setClients] = useState([]);
  const [collaborateurs, setCollaborateurs] = useState([]);

  useEffect(() => {
    api.get('/clients')
      .then(response => setClients(response.data))
      .catch(error => console.error('Error fetching clients', error));
    api.get('/collaborateurs')
      .then(response => setCollaborateurs(response.data))
      .catch(error => console.error('Error fetching collaborateurs', error));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTransaction(prevTransaction => ({
      ...prevTransaction,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/transactions', transaction)
      .then(response => {
        onTransactionAdded(response.data);
        setTransaction({
          date: '',
          montant: '',
          payee: false,
          clientId: '',
          collaborateurId: ''
        });
      })
      .catch(error => {
        console.error('There was an error creating the transaction!', error);
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6">Add Transaction</Typography>
      <TextField
        label="Date"
        type="date"
        name="date"
        value={transaction.date}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Amount"
        type="number"
        name="montant"
        value={transaction.montant}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <FormControlLabel
        control={<Checkbox name="payee" checked={transaction.payee} onChange={handleChange} />}
        label="Paid"
      />
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Client</InputLabel>
        <Select name="clientId" value={transaction.clientId} onChange={handleChange}>
          {clients.map(client => (
            <MenuItem key={client.id} value={client.id}>{client.nom}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Collaborator</InputLabel>
        <Select name="collaborateurId" value={transaction.collaborateurId} onChange={handleChange}>
          {collaborateurs.map(collaborateur => (
            <MenuItem key={collaborateur.id} value={collaborateur.id}>{collaborateur.nom}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Add Transaction
      </Button>
    </Box>
  );
};

export default TransactionForm;
