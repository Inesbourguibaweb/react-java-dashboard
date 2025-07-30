import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ClientForm from './ClientForm.jsx';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

const ClientList = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    api.get('/clients')
      .then(response => {
        setClients(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the clients!', error);
      });
  };

  const handleClientAdded = (newClient) => {
    setClients([...clients, newClient]);
  };

  return (
    <Paper>
      <Typography variant="h4" gutterBottom>
        Clients
      </Typography>
      <ClientForm onClientAdded={handleClientAdded} />
      <List>
        {clients.map(client => (
          <ListItem key={client.id}>
            <ListItemText primary={client.nom} secondary={client.email} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ClientList;
