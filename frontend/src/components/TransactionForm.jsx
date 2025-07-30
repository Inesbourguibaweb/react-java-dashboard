import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { TextField, Button, Box, Typography, Checkbox, FormControlLabel, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const TransactionForm = ({ onTransactionAdded }) => {
  const [date, setDate] = useState('');
  const [montant, setMontant] = useState('');
  const [payee, setPayee] = useState(false);
  const [clientId, setClientId] = useState('');
  const [collaborateurId, setCollaborateurId] = useState('');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const transaction = { date, montant, payee, clientId, collaborateurId };
    api.post('/transactions', transaction)
      .then(response => {
        onTransactionAdded(response.data);
        setDate('');
        setMontant('');
        setPayee(false);
        setClientId('');
        setCollaborateurId('');
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
        value={date}
        onChange={(e) => setDate(e.target.value)}
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
        value={montant}
        onChange={(e) => setMontant(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <FormControlLabel
        control={<Checkbox checked={payee} onChange={(e) => setPayee(e.target.checked)} />}
        label="Paid"
      />
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Client</InputLabel>
        <Select value={clientId} onChange={(e) => setClientId(e.target.value)}>
          {clients.map(client => (
            <MenuItem key={client.id} value={client.id}>{client.nom}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Collaborator</InputLabel>
        <Select value={collaborateurId} onChange={(e) => setCollaborateurId(e.target.value)}>
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
