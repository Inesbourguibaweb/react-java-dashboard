import React, { useState } from 'react';
import api from '../services/api';
import { TextField, Button, Box, Typography } from '@mui/material';

const ClientForm = ({ onClientAdded }) => {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const client = { nom, email, telephone };
    api.post('/clients', client)
      .then(response => {
        onClientAdded(response.data);
        setNom('');
        setEmail('');
        setTelephone('');
      })
      .catch(error => {
        console.error('There was an error creating the client!', error);
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6">Add Client</Typography>
      <TextField
        label="Name"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Telephone"
        value={telephone}
        onChange={(e) => setTelephone(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Add Client
      </Button>
    </Box>
  );
};

export default ClientForm;
