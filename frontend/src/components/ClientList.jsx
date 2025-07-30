import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ClientForm from './ClientForm';

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
    <div>
      <ClientForm onClientAdded={handleClientAdded} />
      <h2>Clients</h2>
      <ul>
        {clients.map(client => (
          <li key={client.id}>{client.nom} - {client.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;
