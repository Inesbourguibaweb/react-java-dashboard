import React, { useState } from 'react';
import api from '../services/api';
import { TextField, Button, Box, Typography } from '@mui/material';

const CollaborateurForm = ({ onCollaborateurAdded }) => {
  const [collaborateur, setCollaborateur] = useState({
    nom: '',
    email: '',
    role: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCollaborateur(prevCollaborateur => ({
      ...prevCollaborateur,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/collaborateurs', collaborateur)
      .then(response => {
        onCollaborateurAdded(response.data);
        setCollaborateur({
          nom: '',
          email: '',
          role: ''
        });
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
        name="nom"
        value={collaborateur.nom}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        type="email"
        name="email"
        value={collaborateur.email}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Role"
        name="role"
        value={collaborateur.role}
        onChange={handleChange}
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
