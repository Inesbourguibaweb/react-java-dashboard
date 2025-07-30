import React, { useState } from 'react';
import api from '../services/api';
import { TextField, Button, Box, Typography } from '@mui/material';

const CollaborateurForm = ({ onCollaborateurAdded }) => {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const collaborateur = { nom, email, role };
    api.post('/collaborateurs', collaborateur)
      .then(response => {
        onCollaborateurAdded(response.data);
        setNom('');
        setEmail('');
        setRole('');
      })
      .catch(error => {
        console.error('There was an error creating the collaborateur!', error);
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6">Add Collaborateur</Typography>
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
        label="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Add Collaborateur
      </Button>
    </Box>
  );
};

export default CollaborateurForm;
