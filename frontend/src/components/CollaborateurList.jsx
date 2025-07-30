import React, { useState, useEffect } from 'react';
import api from '../services/api';
import CollaborateurForm from './CollaborateurForm';

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
    <div>
      <CollaborateurForm onCollaborateurAdded={handleCollaborateurAdded} />
      <h2>Collaborateurs</h2>
      <ul>
        {collaborateurs.map(collaborateur => (
          <li key={collaborateur.id}>{collaborateur.nom} - {collaborateur.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default CollaborateurList;
