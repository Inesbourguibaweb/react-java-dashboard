import React, { useState } from 'react';
import api from '../services/api';
import { TextField, Button, Box, Typography } from '@mui/material';

const ClientForm = ({ onClientAdded }) => {
  const [client, setClient] = useState({
    nom: '',
    email: '',
    telephone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient(prevClient => ({
      ...prevClient,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/clients', client)
      .then(response => {
        onClientAdded(response.data);
        setClient({
          nom: '',
          email: '',
          telephone: ''
        });
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
        name="nom"
        value={client.nom}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        type="email"
        name="email"
        value={client.email}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      
      <TextField
        label="Telephone"
        name="telephone"
        value={client.telephone}
        onChange={handleChange}
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
