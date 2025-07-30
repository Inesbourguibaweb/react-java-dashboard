import React, { useState } from 'react';
import api from '../services/api';

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
    <form onSubmit={handleSubmit}>
      <h3>Add Collaborateur</h3>
      <div>
        <label>Name:</label>
        <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Role:</label>
        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} required />
      </div>
      <button type="submit">Add Collaborateur</button>
    </form>
  );
};

export default CollaborateurForm;
