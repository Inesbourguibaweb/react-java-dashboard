import React, { useState } from 'react';
import api from '../services/api';

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
    <form onSubmit={handleSubmit}>
      <h3>Add Client</h3>
      <div>
        <label>Name:</label>
        <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Telephone:</label>
        <input type="text" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
      </div>
      <button type="submit">Add Client</button>
    </form>
  );
};

export default ClientForm;
