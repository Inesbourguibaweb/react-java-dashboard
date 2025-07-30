import React, { useState, useEffect } from 'react';
import api from '../services/api';
import CollaborateurForm from './CollaborateurForm.jsx';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

const CollaborateurList = () => {
  const [collaborateurs, setCollaborateurs] = useState([]);

  useEffect(() => {
    fetchCollaborateurs();
  }, []);

  const fetchCollaborateurs = () => {
    api.get('/collaborateurs')
      .then(response => {
        setCollaborateurs(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the collaborateurs!', error);
      });
  };

  const handleCollaborateurAdded = (newCollaborateur) => {
    setCollaborateurs([...collaborateurs, newCollaborateur]);
  };

  return (
    <Paper>
      <Typography variant="h4" gutterBottom>
        Collaborateurs
      </Typography>
      <CollaborateurForm onCollaborateurAdded={handleCollaborateurAdded} />
      <List>
        {collaborateurs.map(collaborateur => (
          <ListItem key={collaborateur.id}>
            <ListItemText primary={collaborateur.nom} secondary={collaborateur.email} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default CollaborateurList;
